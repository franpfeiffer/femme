export const WhatsAppButton = () => {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href="https://api.whatsapp.com/send?phone=TU_NUMERO_DE_TELEFONO" className="whatsapp-button" target="_blank">
      <i className="fab fa-whatsapp"></i> Contactar por WhatsApp
    </a>
    )
  }