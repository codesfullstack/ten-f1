import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSendContactEmailMutation } from '../../slices/weatherApiSlice';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [formData, setFormData] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isCaptchaReady, setIsCaptchaReady] = useState(false);
  const recaptchaRef = useRef();
  const [sendContactEmail] = useSendContactEmailMutation();
  const isSpanishLanguage = useSelector((state) => state.cities.isSpanishLanguage);
  const locale = isSpanishLanguage ? 'es' : 'en';
  const texts = {
    en: {
      title: 'Contact',
      subject: 'Subject',
      email: 'Email',
      message: 'Message',
      submit: 'Submit',
      cancel: 'Cancel',
      successMessage: 'Message sent successfully!',
      validation: {
        subjectRequired: 'Subject is required.',
        emailRequired: 'Email is required.',
        messageRequired: 'Message is required.',
      }
    },
    es: {
      title: 'Contacto',
      subject: 'Asunto',
      email: 'Correo electrÃ³nico',
      message: 'Mensaje',
      submit: 'Enviar',
      cancel: 'Cancelar',
      successMessage: 'Â¡Mensaje enviado con Ã©xito!',
      validation: {
        subjectRequired: 'El asunto es requerido.',
        emailRequired: 'El correo electrÃ³nico es requerido.',
        messageRequired: 'El mensaje es requerido.',
      }
    }
  };
  const t = texts[locale];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCaptchaChange = (value) => {
    setIsCaptchaReady(!!value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const token = recaptchaRef.current.getValue();
      const reCaptchaKey = `reCaptcha-${Date.now()}`; // Usar un timestamp para asegurar unicidad
      const reCaptchaData = {
        token,
        expiry: Date.now() + 60 * 60 * 1000, // Expira en 1 hora
      };
      localStorage.setItem(reCaptchaKey, JSON.stringify(reCaptchaData));
      const response = await fetch('https://xxxxxxxxx.app/api/weather/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recaptchaToken: token }),
      });
      const data = await response.json();
      if (data.success) {
        await sendContactEmail({
          subject: formData.subject,
          text: `Email: ${formData.email}\n\nMensaje:\n${formData.message}`,
        }).unwrap();
        alert(t.successMessage);
      } else {
        console.error("reCAPTCHA verification failed");
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      recaptchaRef.current.reset(); // Resetea el reCAPTCHA despuÃ©s de enviar
    }
  };

  const handleCancel = () => {
    setFormData({
      subject: '',
      email: '',
      message: ''
    });
    setErrors({});
    setIsCaptchaReady(false);
    recaptchaRef.current.reset(); // Resetea el reCAPTCHA
  };
  
  return (
    <Box
      sx={{
        maxWidth: '600px',
        width: '77%',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: 3,
        marginTop: {
          xs: '120px',
          sm: '120px',
          md: '50px'
        },
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'none' : 'translateX(20px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: 'black',
          fontSize: '1.6rem',
          marginBottom: '15px',
          fontWeight: 'bold',
          whiteSpace: 'nowrap'
        }}
      >
        {t.title}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="subject"
              label={t.subject}
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              error={Boolean(errors.subject)}
              helperText={errors.subject}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label={t.email}
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="message"
              label={t.message}
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              required
              error={Boolean(errors.message)}
              helperText={errors.message}
            />
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeT3WAqAAAAALa_ZuTiuc0u721BEiiHI74btusy"
              onChange={handleCaptchaChange}
            />
          </Grid>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || !isCaptchaReady}
              >
                {t.submit}
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {t.cancel}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default Contact;
