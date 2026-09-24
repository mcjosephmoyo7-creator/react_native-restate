import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "ar"
  | "zh";

const en = {
  common_cancel: "Cancel",
  common_confirm: "Confirm",
  common_success: "Success",
  common_error: "Error",

  tab_home: "Home",
  tab_explore: "Explore",
  tab_profile: "Profile",

  home_greeting: "Good Morning",
  home_featured: "Featured",
  home_seeAll: "See all",
  home_recommendation: "Our Recommendation",
  search_placeholder: "Search for anything",

  explore_title: "Search for Your Ideal Home",
  explore_found: "Found {count} Properties",

  profile_title: "Profile",
  profile_editTitle: "Edit Profile",
  profile_editSubtitle: "Update your photo or display name",
  profile_photo: "Profile photo",
  profile_changePhoto: "Change photo",
  profile_name: "Full name",
  profile_namePlaceholder: "Enter your full name",
  profile_save: "Save Changes",
  profile_saving: "Saving...",
  profile_updated: "Your profile has been updated.",
  profile_updateError: "We couldn't update your profile. Please try again.",
  profile_nameRequired: "Please enter your name.",
  profile_photoPermission: "Photo library permission is required to change your image.",
  profile_photoError: "We couldn't open your photo library. Please try again.",
  profile_noChanges: "There are no changes to save.",
  settings_bookings: "My Bookings",
  settings_payments: "Payments",
  settings_profile: "Profile",
  settings_notifications: "Notifications",
  settings_security: "Security",
  settings_language: "Language",
  settings_help: "Help Center",
  settings_invite: "Invite Friends",
  settings_logout: "Logout",
  logout_success: "Logged out successfully",
  logout_error: "Failed to logout",

  bookings_title: "My Bookings",
  bookings_upcoming: "Upcoming",
  bookings_completed: "Completed",
  bookings_cancelled: "Cancelled",
  bookings_cancelBooking: "Cancel Booking",
  bookings_directions: "Directions",
  bookings_viewingFee: "viewing fee",
  bookings_deposit: "deposit",
  bookings_noUpcoming: "No upcoming bookings",
  bookings_noCompleted: "No completed bookings",
  bookings_noCancelled: "No cancelled bookings",
  bookings_cancelTitle: "Cancel Booking?",
  bookings_cancelMessage:
    "{property} on {date} will be cancelled. A cancellation fee may apply depending on the host's policy.",
  bookings_keepBooking: "Keep Booking",
  bookings_yesCancel: "Yes, Cancel",
  bookings_cancelledAlert: "Booking Cancelled",
  bookings_cancelledBody:
    "{property} has been removed from your bookings.",

  payments_title: "Payments & Wallet",
  payments_usd: "USD",
  payments_walletBalance: "My Wallet Balance",
  payments_availableBalance: "Available balance in {currency}",
  payments_paymentMethods: "Payment Methods",
  payments_transactionHistory: "Transaction History",
  payments_viewAll: "View all",
  payments_phoneLabel: "Phone Number",
  payments_phonePrompt:
    "Enter the {method} number that will receive the USSD payment authorization prompt.",
  payments_numberSaved: "Number Saved",
  payments_saveNumber: "Save & Use This Number",
  tx_viewingFee: "Property viewing fee",
  tx_deposit: "Booking deposit",
  tx_rent: "Monthly rent",
  tx_success: "Successful",
  tx_pending: "Pending USSD Approval",
  tx_failed: "Failed",
  method_mobileMoney: "Mobile Money · USD / ZiG",
  methodOne_mobileMoney: "Mobile Money · NetOne",
  method_cashDeposit: "Cash Deposit / Wallet",
  method_zimswitch: "ZiG Bank Card",
  method_visa: "Visa / Mastercard",

  notifications_title: "Notifications",
  notifications_subtitle: "Push preferences",
  notifications_stayInLoop: "Stay in the loop",
  notifications_info:
    "Manage which notifications you receive while using the app.",
  notifications_footer:
    "Push notifications may require device permissions. You can change your choices at any time from this screen.",
  notifications_groupProperty: "Property Alerts",
  notifications_groupBooking: "Bookings & Payments",
  notifications_groupApp: "App Updates",
  notif_newAlerts: "New Property Alerts",
  notif_newAlertsDesc:
    "Get notified when new listings that match your search are added.",
  notif_priceDrops: "Price Drops & Deals",
  notif_priceDropsDesc:
    "Be the first to know about price reductions, promos and special offers.",
  notif_bookingReminders: "Booking Reminders",
  notif_bookingRemindersDesc:
    "Reminders for upcoming viewings, deposits and move-in dates.",
  notif_paymentUpdates: "Payment Updates",
  notif_paymentUpdatesDesc:
    "Instant updates on payment confirmations, receipts and failures.",
  notif_appUpdates: "App Updates & Offers",
  notif_appUpdatesDesc:
    "Product updates, new features and exclusive app-only offers.",

  security_title: "Security",
  security_subtitle: "Password & account safety",
  security_signIn: "Sign-In Method",
  security_changePassword: "Change Password",
  security_lastChanged: "Last changed 3 months ago",
  security_auth: "Authentication",
  security_biometrics: "Enable Face ID / Touch ID",
  security_biometricsDesc:
    "Unlock and approve payments with Face ID or your fingerprint.",
  security_twoFA: "Two-Factor Authentication (2FA)",
  security_twoFADesc:
    "Add an extra layer of security with a one-time code on sign-in.",
  security_account: "Account",
  security_deleteAccount: "Delete Account",
  security_deleteDesc:
    "Permanently removes your profile, bookings and payment history. This cannot be undone.",
  security_changeTitle: "Change Password",
  security_changeSub:
    "Choose a strong password of at least 6 characters.",
  security_currentPassword: "Current password",
  security_newPassword: "New password",
  security_confirmPassword: "Confirm new password",
  security_updatePassword: "Update Password",
  security_deleteTitle: "Delete your account?",
  security_deleteBody:
    "You will lose access to your bookings, saved properties and wallet balance. This action is permanent.",
  security_goBack: "Go Back",
  security_continue: "Continue",
  security_finalTitle: "Final confirmation",
  security_finalBody:
    "Type DELETE below to permanently delete your account.",
  security_permanentlyDelete: "Permanently Delete",
  security_alertNotAvailable: "Not Available",
  security_alertNotAvailableBody:
    "Biometric authentication is not supported in the browser.",
  security_alertNotSetUp: "Not Set Up",
  security_alertNotSetUpBody:
    "No supported biometrics found on this device. Please set up Face ID or a fingerprint first.",
  security_alertEnabled: "Enabled",
  security_alertEnabledBody: "Biometric login is now enabled.",
  security_alertDisabled: "Disabled",
  security_alertDisabledBody: "Biometric login has been turned off.",
  security_alertIncomplete: "Incomplete",
  security_alertIncompleteBody: "Please fill in all password fields.",
  security_alertWeak: "Weak Password",
  security_alertWeakBody: "Password must be at least 6 characters.",
  security_alertMismatch: "Mismatch",
  security_alertMismatchBody:
    "New password and confirmation do not match.",
  security_alertUpdated: "Your password has been updated.",
  security_alertIncorrect: "Incorrect",
  security_alertIncorrectBody: "Type DELETE to confirm account deletion.",
  security_alertRequest: "Request Received",
  security_alertRequestBody:
    "Your account deletion request has been submitted and will process within 30 days.",

  language_title: "Language & Region",
  language_subtitle: "Choose app language",
  language_search: "Search languages...",
  language_select: "Select Language",
  language_languages: "{count} languages",
  language_synced:
    "Your language preference is synced across all your devices.",
  language_noMatch: "No languages match \"{query}\"",
  language_confirmTitle: "Change language?",
  language_confirmBody:
    "Switch the app to {name}? The whole interface will be translated.",
  language_switch: "Switch Language",
  language_keep: "Keep Current",

  help_title: "Help Center",
  help_subtitle: "How can we help?",
  help_search: "Search help articles...",
  help_faq: "FAQ",
  help_contact: "Contact Us",
  help_showing: "Showing results for \"{query}\" — check the FAQ categories or contact us for more help.",
  help_team:
    "Our team is here for you. Choose a channel below and we'll get back to you quickly.",
  help_office: "Office address",
  help_address: "12 Borrowdale Road, Harare, Zimbabwe",
  help_hours: "Mon – Sat · 8:00 AM – 6:00 PM",
  faq_bookings: "Bookings",
  faq_payments: "Payments",
  faq_account: "Account",
  faq_cancelQuestion: "How do I cancel a property viewing?",
  faq_cancelAnswer:
    "Open My Bookings, select the upcoming viewing and tap 'Cancel Booking'. Cancellations made more than 24 hours before the scheduled time are free of charge.",
  faq_rescheduleQuestion: "Can I reschedule a booking?",
  faq_rescheduleAnswer:
    "Yes. Contact the agent from the booking details page, or reach our support team and we will reschedule the viewing to a slot that suits you.",
  faq_depositQuestion: "What happens to my deposit after a booking?",
  faq_depositAnswer:
    "Deposits paid at booking are held securely and applied to your move-in costs. They are fully refundable if the property is not delivered as described.",
  faq_methodsQuestion: "Which payment methods are supported?",
  faq_methodsAnswer:
    "We accept EcoCash, OneMoney, InnBucks, Zimswitch, and USD Visa/Mastercard. You can switch your preferred default method in Payments & Wallet.",
  faq_ussdQuestion: "How do I receive a USSD payment prompt?",
  faq_ussdAnswer:
    "When paying by mobile money, your registered phone number receives an EcoCash or OneMoney USSD prompt. Approve it to complete the transaction instantly.",
  faq_refundQuestion: "When will my refund be processed?",
  faq_refundAnswer:
    "Approved refunds are processed within 3–5 business days and are returned through the original payment method used for the transaction.",
  faq_passwordQuestion: "How do I change my password?",
  faq_passwordAnswer:
    "Go to Security in your profile, tap 'Change Password' and follow the steps. You will be asked to verify your current password first.",
  faq_biometricsQuestion: "How do I enable Face ID / Touch ID?",
  faq_biometricsAnswer:
    "Open Security, then toggle on 'Enable Face ID / Touch ID'. Your device will prompt you to authenticate once to confirm the setup.",
  faq_deleteQuestion: "How do I delete my account?",
  faq_deleteAnswer:
    "Navigate to Security > Delete Account. You will need to confirm twice, including typing DELETE. Your data is removed within 30 days.",
  contact_call: "Customer Support Call",
  contact_callSub: "Mon–Sun, 8am–6pm",
  contact_whatsapp: "WhatsApp Support",
  contact_whatsappSub: "Replies within 5 minutes",
  contact_email: "Email Us",
  contact_emailAddr: "support@restate.co.zw",
  contact_liveChat: "Live Chat",
  contact_liveChatSub: "Chat with an agent now",
  contact_liveChatAlert: "Live Chat",
  contact_liveChatBody:
    "Connecting you to the next available support agent...",

  invite_title: "Invite Friends",
  invite_bannerTitle: "Invite Friends & Earn Rewards",
  invite_bannerBody:
    "Earn USD 25 for every friend who books their first property.",
  invite_referralCode: "Your Referral Code",
  invite_shareHint:
    "Share this code or link — you'll earn rewards on every new sign-up.",
  invite_copyCode: "Copy Code",
  invite_copied: "Copied!",
  invite_shareLink: "Share Referral Link",
  invite_invitedFriends: "Invited Friends",
  invite_rewarded: "{count} rewarded",
  invite_statusPending: "Pending",
  invite_statusRewarded: "Rewarded",
  invite_terms:
    "Rewards are paid to your wallet once the invited friend completes their first successful booking. Terms & conditions apply.",
  invite_jointAlert: "Joined · {date}",
  invite_invitedAlert: "Invited · {date}",
  invite_shared: "Shared",
  invite_sharedBody: "Thanks for sharing!",
  invite_errorBody: "Unable to open the share sheet.",

  property_agent: "Agent",
  property_overview: "Overview",
  property_facilities: "Facilities",
  property_gallery: "Gallery",
  property_location: "Location",
  property_price: "Price",
  property_bookNow: "Book Now",
  property_viewAll: "View All",
  property_beds: "{count} Beds",
  property_baths: "{count} Baths",
  property_area: "{count} sqft",
  property_reviews: "({count} reviews)",
};

export type TranslationKey = keyof typeof en;

const translations: Record<string, Partial<Record<TranslationKey, string>>> = {
  en,
  es: {
    common_cancel: "Cancelar",
    common_confirm: "Confirmar",
    common_success: "Éxito",
    common_error: "Error",

    tab_home: "Inicio",
    tab_explore: "Explorar",
    tab_profile: "Perfil",

    home_greeting: "Buenos días",
    home_featured: "Destacado",
    home_seeAll: "Ver todo",
    home_recommendation: "Nuestra Recomendación",
    search_placeholder: "Buscar cualquier cosa",

    explore_title: "Busca tu Hogar Ideal",
  explore_found: "Encontradas {count} Propiedades",

    profile_title: "Perfil",
    settings_bookings: "Mis Reservas",
    settings_payments: "Pagos",
    settings_profile: "Perfil",
    profile_editTitle: "Editar perfil",
    profile_editSubtitle: "Actualiza tu foto o nombre",
    profile_photo: "Foto de perfil",
    profile_changePhoto: "Cambiar foto",
    profile_name: "Nombre completo",
    profile_namePlaceholder: "Introduce tu nombre completo",
    profile_save: "Guardar cambios",
    profile_saving: "Guardando...",
    profile_updated: "Tu perfil se ha actualizado.",
    profile_updateError: "No pudimos actualizar tu perfil. Inténtalo de nuevo.",
    profile_nameRequired: "Introduce tu nombre.",
    profile_photoPermission: "Se necesita permiso de la galería para cambiar tu imagen.",
    profile_photoError: "No pudimos abrir tu galería. Inténtalo de nuevo.",
    profile_noChanges: "No hay cambios para guardar.",
    settings_notifications: "Notificaciones",
    settings_security: "Seguridad",
    settings_language: "Idioma",
    settings_help: "Centro de Ayuda",
    settings_invite: "Invitar Amigos",
    settings_logout: "Cerrar sesión",
    logout_success: "Sesión cerrada con éxito",
    logout_error: "Error al cerrar sesión",

    bookings_title: "Mis Reservas",
    bookings_upcoming: "Próximas",
    bookings_completed: "Completadas",
    bookings_cancelled: "Canceladas",
    bookings_cancelBooking: "Cancelar Reserva",
    bookings_directions: "Indicaciones",
    bookings_viewingFee: "tarifa de visita",
    bookings_deposit: "depósito",
    bookings_noUpcoming: "No hay reservas próximas",
    bookings_noCompleted: "No hay reservas completadas",
    bookings_noCancelled: "No hay reservas canceladas",
    bookings_cancelTitle: "¿Cancelar reserva?",
    bookings_cancelMessage:
      "{property} el {date} será cancelada. Puede aplicarse una tarifa de cancelación según la política del anfitrión.",
    bookings_keepBooking: "Mantener Reserva",
    bookings_yesCancel: "Sí, Cancelar",
    bookings_cancelledAlert: "Reserva Cancelada",
    bookings_cancelledBody:
      "{property} se ha eliminado de tus reservas.",

    payments_title: "Pagos y Billetera",
    payments_walletBalance: "Mi Saldo en la Billetera",
    payments_availableBalance: "Saldo disponible en {currency}",
    payments_paymentMethods: "Métodos de Pago",
    payments_transactionHistory: "Historial de Transacciones",
    payments_viewAll: "Ver todo",
    payments_phoneLabel: "Número de Teléfono",
    payments_phonePrompt:
      "Introduce el número de {method} que recibirá el aviso de autorización USSD.",
    payments_numberSaved: "Número Guardado",
    payments_saveNumber: "Guardar y Usar Este Número",
    tx_viewingFee: "Tarifa de visita de propiedad",
    tx_deposit: "Depósito de reserva",
    tx_rent: "Alquiler mensual",
    tx_success: "Exitoso",
    tx_pending: "Pendiente de aprobación USSD",
    tx_failed: "Fallido",
    method_mobileMoney: "Dinero móvil · USD / ZiG",
    methodOne_mobileMoney: "Dinero móvil · NetOne",
    method_cashDeposit: "Depósito en efectivo / Billetera",
    method_zimswitch: "Tarjeta bancaria ZiG",
    method_visa: "Visa / Mastercard",

    notifications_title: "Notificaciones",
    notifications_subtitle: "Preferencias push",
    notifications_stayInLoop: "Mantente informado",
    notifications_info:
      "Gestiona qué notificaciones recibes mientras usas la aplicación.",
    notifications_footer:
      "Las notificaciones push pueden requerir permisos del dispositivo. Puedes cambiar tus preferencias en cualquier momento desde esta pantalla.",
    notifications_groupProperty: "Alertas de Propiedades",
    notifications_groupBooking: "Reservas y Pagos",
    notifications_groupApp: "Actualizaciones de la App",
    notif_newAlerts: "Nuevas Alertas de Propiedades",
    notif_newAlertsDesc:
      "Recibe notificaciones cuando se agreguen listados que coincidan con tu búsqueda.",
    notif_priceDrops: "Caídas de Precio y Ofertas",
    notif_priceDropsDesc:
      "Sé el primero en enterarte de reducciones de precio, promociones y ofertas especiales.",
    notif_bookingReminders: "Recordatorios de Reservas",
    notif_bookingRemindersDesc:
      "Recordatorios de visitas próximas, depósitos y fechas de mudanza.",
    notif_paymentUpdates: "Actualizaciones de Pago",
    notif_paymentUpdatesDesc:
      "Actualizaciones instantáneas de confirmaciones, recibos y fallos de pago.",
    notif_appUpdates: "Actualizaciones y Ofertas de la App",
    notif_appUpdatesDesc:
      "Actualizaciones de producto, nuevas funciones y ofertas exclusivas de la aplicación.",

    security_title: "Seguridad",
    security_subtitle: "Contraseña y seguridad de la cuenta",
    security_signIn: "Método de Inicio de Sesión",
    security_changePassword: "Cambiar Contraseña",
    security_lastChanged: "Cambiada hace 3 meses",
    security_auth: "Autenticación",
    security_biometrics: "Activar Face ID / Touch ID",
    security_biometricsDesc:
      "Desbloquea y aprueba pagos con Face ID o tu huella digital.",
    security_twoFA: "Autenticación de Dos Factores (2FA)",
    security_twoFADesc:
      "Añade una capa extra de seguridad con un código de un solo uso al iniciar sesión.",
    security_account: "Cuenta",
    security_deleteAccount: "Eliminar Cuenta",
    security_deleteDesc:
      "Elimina permanentemente tu perfil, reservas e historial de pagos. Esto no se puede deshacer.",
    security_changeTitle: "Cambiar Contraseña",
    security_changeSub:
      "Elige una contraseña segura de al menos 6 caracteres.",
    security_currentPassword: "Contraseña actual",
    security_newPassword: "Nueva contraseña",
    security_confirmPassword: "Confirmar nueva contraseña",
    security_updatePassword: "Actualizar Contraseña",
    security_deleteTitle: "¿Eliminar tu cuenta?",
    security_deleteBody:
      "Perderás el acceso a tus reservas, propiedades guardadas y saldo de la billetera. Esta acción es permanente.",
    security_goBack: "Volver",
    security_continue: "Continuar",
    security_finalTitle: "Confirmación final",
    security_finalBody:
      "Escribe DELETE a continuación para eliminar tu cuenta permanentemente.",
    security_permanentlyDelete: "Eliminar Permanentemente",
    security_alertNotAvailable: "No Disponible",
    security_alertNotAvailableBody:
      "La autenticación biométrica no es compatible con el navegador.",
    security_alertNotSetUp: "No Configurado",
    security_alertNotSetUpBody:
      "No se encontraron biometrías compatibles en este dispositivo. Configura Face ID o una huella digital primero.",
    security_alertEnabled: "Activado",
    security_alertEnabledBody: "El inicio de sesión biométrico está activado.",
    security_alertDisabled: "Desactivado",
    security_alertDisabledBody: "El inicio de sesión biométrico se ha desactivado.",
    security_alertIncomplete: "Incompleto",
    security_alertIncompleteBody: "Rellena todos los campos de contraseña.",
    security_alertWeak: "Contraseña Débil",
    security_alertWeakBody: "La contraseña debe tener al menos 6 caracteres.",
    security_alertMismatch: "No Coinciden",
    security_alertMismatchBody:
      "La nueva contraseña y la confirmación no coinciden.",
    security_alertUpdated: "Tu contraseña ha sido actualizada.",
    security_alertIncorrect: "Incorrecto",
    security_alertIncorrectBody: "Escribe DELETE para confirmar la eliminación.",
    security_alertRequest: "Solicitud Recibida",
    security_alertRequestBody:
      "Tu solicitud de eliminación se ha enviado y se procesará en 30 días.",

    language_title: "Idioma y Región",
    language_subtitle: "Elige el idioma de la aplicación",
    language_search: "Buscar idiomas...",
    language_select: "Seleccionar Idioma",
    language_languages: "{count} idiomas",
    language_synced:
      "Tu preferencia de idioma se sincroniza en todos tus dispositivos.",
    language_noMatch: "Ningún idioma coincide con \"{query}\"",
    language_confirmTitle: "¿Cambiar idioma?",
    language_confirmBody:
      "¿Cambiar la aplicación a {name}? Toda la interfaz se traducirá.",
    language_switch: "Cambiar Idioma",
    language_keep: "Mantener Actual",

    help_title: "Centro de Ayuda",
    help_subtitle: "¿Cómo podemos ayudar?",
    help_search: "Buscar artículos de ayuda...",
    help_faq: "Preguntas Frecuentes",
    help_contact: "Contáctanos",
    help_showing:
      "Mostrando resultados para \"{query}\" — revisa las categorías de FAQ o contáctanos.",
    help_team:
      "Nuestro equipo está aquí para ti. Elige un canal y te responderemos rápidamente.",
    help_office: "Dirección de la oficina",
    help_address: "12 Borrowdale Road, Harare, Zimbabue",
    help_hours: "Lun – Sáb · 8:00 AM – 6:00 PM",
    faq_bookings: "Reservas",
    faq_payments: "Pagos",
    faq_account: "Cuenta",
    faq_cancelQuestion: "¿Cómo cancelo una visita a una propiedad?",
    faq_cancelAnswer:
      "Abre Mis Reservas, selecciona la visita próxima y toca 'Cancelar Reserva'. Las cancelaciones con más de 24 horas de antelación son gratuitas.",
    faq_rescheduleQuestion: "¿Puedo reprogramar una reserva?",
    faq_rescheduleAnswer:
      "Sí. Contacta al agente desde la página de detalles de la reserva, o contacta a nuestro equipo de soporte y reprogramaremos la visita.",
    faq_depositQuestion: "¿Qué pasa con mi depósito después de una reserva?",
    faq_depositAnswer:
      "Los depósitos pagados se guardan de forma segura y se aplican a tus costos de mudanza. Son totalmente reembolsables si la propiedad no es entregada como se describió.",
    faq_methodsQuestion: "¿Qué métodos de pago son compatibles?",
    faq_methodsAnswer:
      "Aceptamos EcoCash, OneMoney, InnBucks, Zimswitch y Visa/Mastercard USD. Puedes cambiar tu método predeterminado en Pagos y Billetera.",
    faq_ussdQuestion: "¿Cómo recibo un aviso de pago USSD?",
    faq_ussdAnswer:
      "Al pagar con dinero móvil, tu número registrado recibe un aviso USSD de EcoCash o OneMoney. Aprueba para completar la transacción al instante.",
    faq_refundQuestion: "¿Cuándo se procesará mi reembolso?",
    faq_refundAnswer:
      "Los reembolsos aprobados se procesan en 3–5 días hábiles y se devuelven por el método de pago original.",
    faq_passwordQuestion: "¿Cómo cambio mi contraseña?",
    faq_passwordAnswer:
      "Ve a Seguridad en tu perfil, toca 'Cambiar Contraseña' y sigue los pasos. Se te pedirá verificar tu contraseña actual.",
    faq_biometricsQuestion: "¿Cómo activo Face ID / Touch ID?",
    faq_biometricsAnswer:
      "Abre Seguridad y activa 'Face ID / Touch ID'. Tu dispositivo te pedirá autenticarte una vez para confirmar la configuración.",
    faq_deleteQuestion: "¿Cómo elimino mi cuenta?",
    faq_deleteAnswer:
      "Ve a Seguridad > Eliminar Cuenta. Deberás confirmar dos veces, incluyendo escribir DELETE. Tus datos se eliminan en 30 días.",
    contact_call: "Llamada de Soporte",
    contact_callSub: "Lun–Dom, 8am–6pm",
    contact_whatsapp: "Soporte por WhatsApp",
    contact_whatsappSub: "Responde en 5 minutos",
    contact_email: "Envíanos un Correo",
    contact_emailAddr: "support@restate.co.zw",
    contact_liveChat: "Chat en Vivo",
    contact_liveChatSub: "Chatea con un agente ahora",
    contact_liveChatAlert: "Chat en Vivo",
    contact_liveChatBody:
      "Conectándote con el próximo agente de soporte disponible...",

    invite_title: "Invitar Amigos",
    invite_bannerTitle: "Invita Amigos y Gana Recompensas",
    invite_bannerBody:
      "Gana USD 25 por cada amigo que reserve su primera propiedad.",
    invite_referralCode: "Tu Código de Referencia",
    invite_shareHint:
      "Comparte este código o enlace: ganarás recompensas con cada registro nuevo.",
    invite_copyCode: "Copiar Código",
    invite_copied: "¡Copiado!",
    invite_shareLink: "Compartir Enlace de Referencia",
    invite_invitedFriends: "Amigos Invitados",
    invite_rewarded: "{count} premiados",
    invite_statusPending: "Pendiente",
    invite_statusRewarded: "Premiado",
    invite_terms:
      "Las recompensas se pagan a tu billetera una vez que el amigo invitado completa su primera reserva exitosa. Se aplican términos y condiciones.",
    invite_jointAlert: "Se unió · {date}",
    invite_invitedAlert: "Invitado · {date}",
    invite_shared: "Compartido",
    invite_sharedBody: "¡Gracias por compartir!",
    invite_errorBody: "No se pudo abrir la hoja para compartir.",

    property_agent: "Agente",
    property_overview: "Resumen",
    property_facilities: "Instalaciones",
    property_gallery: "Galería",
    property_location: "Ubicación",
    property_price: "Precio",
    property_bookNow: "Reservar Ahora",
    property_viewAll: "Ver Todo",
    property_beds: "{count} Habitaciones",
    property_baths: "{count} Baños",
    property_area: "{count} m2",
    property_reviews: "({count} reseñas)",
  },
  fr: {
    common_cancel: "Annuler",
    common_confirm: "Confirmer",
    common_success: "Succès",
    common_error: "Erreur",

    tab_home: "Accueil",
    tab_explore: "Explorer",
    tab_profile: "Profil",

    home_greeting: "Bonjour",
    home_featured: "À la une",
    home_seeAll: "Tout voir",
    home_recommendation: "Notre Recommandation",
    search_placeholder: "Rechercher n'importe quoi",

    explore_title: "Trouvez Votre Maison Idéale",
  explore_found: "{count} biens trouvés",

    profile_title: "Profil",
    settings_bookings: "Mes Réservations",
    settings_payments: "Paiements",
    settings_profile: "Profil",
    profile_editTitle: "Modifier le profil",
    profile_editSubtitle: "Mettez à jour votre photo ou votre nom",
    profile_photo: "Photo de profil",
    profile_changePhoto: "Changer la photo",
    profile_name: "Nom complet",
    profile_namePlaceholder: "Saisissez votre nom complet",
    profile_save: "Enregistrer",
    profile_saving: "Enregistrement...",
    profile_updated: "Votre profil a été mis à jour.",
    profile_updateError: "Impossible de mettre à jour votre profil. Réessayez.",
    profile_nameRequired: "Veuillez saisir votre nom.",
    profile_photoPermission: "L'accès à vos photos est nécessaire pour changer votre image.",
    profile_photoError: "Impossible d'ouvrir vos photos. Réessayez.",
    profile_noChanges: "Aucune modification à enregistrer.",
    settings_notifications: "Notifications",
    settings_security: "Sécurité",
    settings_language: "Langue",
    settings_help: "Centre d'Aide",
    settings_invite: "Inviter des Amis",
    settings_logout: "Déconnexion",
    logout_success: "Déconnecté avec succès",
    logout_error: "Échec de la déconnexion",

    bookings_title: "Mes Réservations",
    bookings_upcoming: "À venir",
    bookings_completed: "Terminées",
    bookings_cancelled: "Annulées",
    bookings_cancelBooking: "Annuler la Réservation",
    bookings_directions: "Itinéraire",
    bookings_viewingFee: "frais de visite",
    bookings_deposit: "acompte",
    bookings_noUpcoming: "Aucune réservation à venir",
    bookings_noCompleted: "Aucune réservation terminée",
    bookings_noCancelled: "Aucune réservation annulée",
    bookings_cancelTitle: "Annuler la réservation ?",
    bookings_cancelMessage:
      "{property} le {date} sera annulée. Des frais d'annulation peuvent s'appliquer selon la politique de l'hôte.",
    bookings_keepBooking: "Garder la Réservation",
    bookings_yesCancel: "Oui, Annuler",
    bookings_cancelledAlert: "Réservation annulée",
    bookings_cancelledBody:
      "{property} a été supprimé de vos réservations.",

    payments_title: "Paiements et Portefeuille",
    payments_walletBalance: "Mon Solde",
    payments_availableBalance: "Solde disponible en {currency}",
    payments_paymentMethods: "Moyens de Paiement",
    payments_transactionHistory: "Historique des Transactions",
    payments_viewAll: "Tout voir",
    payments_phoneLabel: "Numéro de Téléphone",
    payments_phonePrompt:
      "Saisissez le numéro {method} qui recevra l'invitation d'autorisation USSD.",
    payments_numberSaved: "Numéro Enregistré",
    payments_saveNumber: "Enregistrer et Utiliser ce Numéro",
    tx_viewingFee: "Frais de visite du bien",
    tx_deposit: "Acompte de réservation",
    tx_rent: "Loyer mensuel",
    tx_success: "Réussi",
    tx_pending: "En attente d'approbation USSD",
    tx_failed: "Échoué",
    method_mobileMoney: "Mobile Money · USD / ZiG",
    methodOne_mobileMoney: "Mobile Money · NetOne",
    method_cashDeposit: "Dépôt en espèces / Portefeuille",
    method_zimswitch: "Carte bancaire ZiG",
    method_visa: "Visa / Mastercard",

    notifications_title: "Notifications",
    notifications_subtitle: "Préférences push",
    notifications_stayInLoop: "Restez informé",
    notifications_info:
      "Gérez les notifications que vous recevez lorsque vous utilisez l'application.",
    notifications_footer:
      "Les notifications push peuvent nécessiter des autorisations. Vous pouvez modifier vos choix à tout moment depuis cet écran.",
    notifications_groupProperty: "Alertes Immobilières",
    notifications_groupBooking: "Réservations et Paiements",
    notifications_groupApp: "Mises à Jour de l'App",
    notif_newAlerts: "Nouvelles Alertes de Biens",
    notif_newAlertsDesc:
      "Soyez notifié lorsque de nouvelles annonces correspondant à votre recherche sont ajoutées.",
    notif_priceDrops: "Baisses de Prix et Offres",
    notif_priceDropsDesc:
      "Soyez le premier informé des baisses de prix, promotions et offres spéciales.",
    notif_bookingReminders: "Rappels de Réservation",
    notif_bookingRemindersDesc:
      "Rappels pour les visites à venir, acomptes et dates d'emménagement.",
    notif_paymentUpdates: "Mises à Jour de Paiement",
    notif_paymentUpdatesDesc:
      "Mises à jour instantanées sur les confirmations, reçus et échecs de paiement.",
    notif_appUpdates: "Mises à Jour et Offres de l'App",
    notif_appUpdatesDesc:
      "Nouvelles fonctionnalités et offres exclusives de l'application.",

    security_title: "Sécurité",
    security_subtitle: "Mot de passe et sécurité du compte",
    security_signIn: "Méthode de Connexion",
    security_changePassword: "Changer le Mot de Passe",
    security_lastChanged: "Modifié il y a 3 mois",
    security_auth: "Authentification",
    security_biometrics: "Activer Face ID / Touch ID",
    security_biometricsDesc:
      "Déverrouillez et approuvez les paiements avec Face ID ou votre empreinte digitale.",
    security_twoFA: "Authentification à Deux Facteurs (2FA)",
    security_twoFADesc:
      "Ajoutez une couche de sécurité supplémentaire avec un code à usage unique à la connexion.",
    security_account: "Compte",
    security_deleteAccount: "Supprimer le Compte",
    security_deleteDesc:
      "Supprime définitivement votre profil, vos réservations et votre historique de paiement. Cette action est irréversible.",
    security_changeTitle: "Changer le Mot de Passe",
    security_changeSub:
      "Choisissez un mot de passe fort d'au moins 6 caractères.",
    security_currentPassword: "Mot de passe actuel",
    security_newPassword: "Nouveau mot de passe",
    security_confirmPassword: "Confirmer le nouveau mot de passe",
    security_updatePassword: "Mettre à Jour le Mot de Passe",
    security_deleteTitle: "Supprimer votre compte ?",
    security_deleteBody:
      "Vous perdrez l'accès à vos réservations, biens enregistrés et solde du portefeuille. Cette action est permanente.",
    security_goBack: "Retour",
    security_continue: "Continuer",
    security_finalTitle: "Confirmation finale",
    security_finalBody:
      "Tapez DELETE ci-dessous pour supprimer définitivement votre compte.",
    security_permanentlyDelete: "Supprimer Définitivement",
    security_alertNotAvailable: "Indisponible",
    security_alertNotAvailableBody:
      "L'authentification biométrique n'est pas prise en charge dans le navigateur.",
    security_alertNotSetUp: "Non Configuré",
    security_alertNotSetUpBody:
      "Aucune biométrie prise en charge trouvée sur cet appareil. Configurez d'abord Face ID ou une empreinte.",
    security_alertEnabled: "Activé",
    security_alertEnabledBody:
      "La connexion biométrique est maintenant activée.",
    security_alertDisabled: "Désactivé",
    security_alertDisabledBody:
      "La connexion biométrique a été désactivée.",
    security_alertIncomplete: "Incomplet",
    security_alertIncompleteBody:
      "Veuillez remplir tous les champs du mot de passe.",
    security_alertWeak: "Mot de Passe Faible",
    security_alertWeakBody:
      "Le mot de passe doit contenir au moins 6 caractères.",
    security_alertMismatch: "Non Correspondance",
    security_alertMismatchBody:
      "Le nouveau mot de passe et la confirmation ne correspondent pas.",
    security_alertUpdated: "Votre mot de passe a été mis à jour.",
    security_alertIncorrect: "Incorrect",
    security_alertIncorrectBody:
      "Tapez DELETE pour confirmer la suppression du compte.",
    security_alertRequest: "Demande Reçue",
    security_alertRequestBody:
      "Votre demande de suppression a été soumise et sera traitée sous 30 jours.",

    language_title: "Langue et Région",
    language_subtitle: "Choisissez la langue de l'application",
    language_search: "Rechercher des langues...",
    language_select: "Sélectionner la Langue",
    language_languages: "{count} langues",
    language_synced:
      "Votre préférence linguistique est synchronisée sur tous vos appareils.",
    language_noMatch: "Aucune langue ne correspond à \"{query}\"",
    language_confirmTitle: "Changer de langue ?",
    language_confirmBody:
      "Passer l'application en {name} ? Toute l'interface sera traduite.",
    language_switch: "Changer la Langue",
    language_keep: "Garder Actuelle",

    help_title: "Centre d'Aide",
    help_subtitle: "Comment pouvons-nous aider ?",
    help_search: "Rechercher des articles d'aide...",
    help_faq: "FAQ",
    help_contact: "Contactez-nous",
    help_showing:
      "Affichage des résultats pour \"{query}\" — consultez les catégories de FAQ ou contactez-nous.",
    help_team:
      "Notre équipe est là pour vous. Choisissez un canal et nous vous répondrons rapidement.",
    help_office: "Adresse du bureau",
    help_address: "12 Borrowdale Road, Harare, Zimbabwe",
    help_hours: "Lun – Sam · 8h00 – 18h00",
    faq_bookings: "Réservations",
    faq_payments: "Paiements",
    faq_account: "Compte",
    faq_cancelQuestion: "Comment annuler une visite de bien ?",
    faq_cancelAnswer:
      "Ouvrez Mes Réservations, sélectionnez la visite à venir et appuyez sur 'Annuler la réservation'. Les annulations plus de 24 heures avant sont gratuites.",
    faq_rescheduleQuestion: "Puis-je reprogrammer une réservation ?",
    faq_rescheduleAnswer:
      "Oui. Contactez l'agent depuis la page de détails de la réservation ou notre équipe de support pour reprogrammer la visite.",
    faq_depositQuestion: "Qu'advient-il de mon acompte après une réservation ?",
    faq_depositAnswer:
      "Les acomptes sont conservés en toute sécurité et appliqués à vos frais d'emménagement. Ils sont entièrement remboursables si le bien n'est pas livré comme décrit.",
    faq_methodsQuestion: "Quels moyens de paiement sont pris en charge ?",
    faq_methodsAnswer:
      "Nous acceptons EcoCash, OneMoney, InnBucks, Zimswitch et Visa/Mastercard USD. Vous pouvez changer votre mode par défaut dans Paiements et Portefeuille.",
    faq_ussdQuestion: "Comment recevoir une invitation de paiement USSD ?",
    faq_ussdAnswer:
      "Lors d'un paiement mobile money, votre numéro enregistré reçoit une invitation USSD EcoCash ou OneMoney. Approuvez-la pour terminer la transaction.",
    faq_refundQuestion: "Quand mon remboursement sera-t-il traité ?",
    faq_refundAnswer:
      "Les remboursements approuvés sont traités sous 3–5 jours ouvrables et retournés via le moyen de paiement d'origine.",
    faq_passwordQuestion: "Comment changer mon mot de passe ?",
    faq_passwordAnswer:
      "Allez dans Sécurité de votre profil, touchez 'Changer le mot de passe' et suivez les étapes.",
    faq_biometricsQuestion: "Comment activer Face ID / Touch ID ?",
    faq_biometricsAnswer:
      "Ouvrez Sécurité, puis activez 'Face ID / Touch ID'. Votre appareil vous demandera de vous authentifier une fois.",
    faq_deleteQuestion: "Comment supprimer mon compte ?",
    faq_deleteAnswer:
      "Allez dans Sécurité > Supprimer le compte. Vous devrez confirmer deux fois, y compris en tapant DELETE. Vos données sont supprimées sous 30 jours.",
    contact_call: "Appel Support Client",
    contact_callSub: "Lun–Dim, 8h–18h",
    contact_whatsapp: "Support WhatsApp",
    contact_whatsappSub: "Réponse sous 5 minutes",
    contact_email: "Envoyez-nous un E-mail",
    contact_emailAddr: "support@restate.co.zw",
    contact_liveChat: "Chat en Direct",
    contact_liveChatSub: "Discutez avec un agent maintenant",
    contact_liveChatAlert: "Chat en Direct",
    contact_liveChatBody:
      "Connexion au prochain agent de support disponible...",

    invite_title: "Inviter des Amis",
    invite_bannerTitle: "Invitez des Amis et Gagnez des Récompenses",
    invite_bannerBody:
      "Gagnez 25 USD pour chaque ami qui réserve son premier bien.",
    invite_referralCode: "Votre Code de Parrainage",
    invite_shareHint:
      "Partagez ce code ou ce lien — vous gagnerez des récompenses à chaque nouvelle inscription.",
    invite_copyCode: "Copier le Code",
    invite_copied: "Copié !",
    invite_shareLink: "Partager le Lien de Parrainage",
    invite_invitedFriends: "Amis Invités",
    invite_rewarded: "{count} récompensés",
    invite_statusPending: "En attente",
    invite_statusRewarded: "Récompensé",
    invite_terms:
      "Les récompenses sont versées sur votre portefeuille une fois que l'ami invité complète sa première réservation. Conditions applicables.",
    invite_jointAlert: "A rejoint · {date}",
    invite_invitedAlert: "Invité · {date}",
    invite_shared: "Partagé",
    invite_sharedBody: "Merci d'avoir partagé !",
    invite_errorBody: "Impossible d'ouvrir la feuille de partage.",

    property_agent: "Agent",
    property_overview: "Aperçu",
    property_facilities: "Équipements",
    property_gallery: "Galerie",
    property_location: "Emplacement",
    property_price: "Prix",
    property_bookNow: "Réserver Maintenant",
    property_viewAll: "Tout Voir",
    property_beds: "{count} Chambres",
    property_baths: "{count} Salles de bain",
    property_area: "{count} m²",
    property_reviews: "({count} avis)",
  },
  de: {
    common_cancel: "Abbrechen",
    common_confirm: "Bestätigen",
    common_success: "Erfolg",
    common_error: "Fehler",

    tab_home: "Start",
    tab_explore: "Entdecken",
    tab_profile: "Profil",

    home_greeting: "Guten Morgen",
    home_featured: "Empfohlen",
    home_seeAll: "Alle ansehen",
    home_recommendation: "Unsere Empfehlung",
    search_placeholder: "Nach etwas suchen",

    explore_title: "Finden Sie Ihr Traumhaus",
  explore_found: "{count} Immobilien gefunden",

    profile_title: "Profil",
    settings_bookings: "Meine Buchungen",
    settings_payments: "Zahlungen",
    settings_profile: "Profil",
    profile_editTitle: "Profil bearbeiten",
    profile_editSubtitle: "Aktualisieren Sie Ihr Foto oder Ihren Namen",
    profile_photo: "Profilfoto",
    profile_changePhoto: "Foto ändern",
    profile_name: "Vollständiger Name",
    profile_namePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    profile_save: "Änderungen speichern",
    profile_saving: "Wird gespeichert...",
    profile_updated: "Ihr Profil wurde aktualisiert.",
    profile_updateError: "Ihr Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
    profile_nameRequired: "Bitte geben Sie Ihren Namen ein.",
    profile_photoPermission: "Für ein neues Profilfoto wird der Zugriff auf Fotos benötigt.",
    profile_photoError: "Ihre Fotomediathek konnte nicht geöffnet werden. Bitte versuchen Sie es erneut.",
    profile_noChanges: "Es gibt keine Änderungen zum Speichern.",
    settings_notifications: "Benachrichtigungen",
    settings_security: "Sicherheit",
    settings_language: "Sprache",
    settings_help: "Hilfecenter",
    settings_invite: "Freunde einladen",
    settings_logout: "Abmelden",
    logout_success: "Erfolgreich abgemeldet",
    logout_error: "Abmeldung fehlgeschlagen",

    bookings_title: "Meine Buchungen",
    bookings_upcoming: "Bevorstehend",
    bookings_completed: "Abgeschlossen",
    bookings_cancelled: "Storniert",
    bookings_cancelBooking: "Buchung stornieren",
    bookings_directions: "Route",
    bookings_viewingFee: "Besichtigungsgebühr",
    bookings_deposit: "Anzahlung",
    bookings_noUpcoming: "Keine bevorstehenden Buchungen",
    bookings_noCompleted: "Keine abgeschlossenen Buchungen",
    bookings_noCancelled: "Keine stornierten Buchungen",
    bookings_cancelTitle: "Buchung stornieren?",
    bookings_cancelMessage:
      "{property} am {date} wird storniert. Je nach Richtlinie des Gastgebers kann eine Stornogebühr anfallen.",
    bookings_keepBooking: "Buchung behalten",
    bookings_yesCancel: "Ja, stornieren",
    bookings_cancelledAlert: "Buchung storniert",
    bookings_cancelledBody:
      "{property} wurde aus Ihren Buchungen entfernt.",

    payments_title: "Zahlungen & Geldbörse",
    payments_walletBalance: "Mein Guthaben",
    payments_availableBalance: "Verfügbares Guthaben in {currency}",
    payments_paymentMethods: "Zahlungsmethoden",
    payments_transactionHistory: "Transaktionsverlauf",
    payments_viewAll: "Alle ansehen",
    payments_phoneLabel: "Telefonnummer",
    payments_phonePrompt:
      "Geben Sie die {method}-Nummer ein, die die USSD-Autorisierungsaufforderung erhalten soll.",
    payments_numberSaved: "Nummer gespeichert",
    payments_saveNumber: "Speichern & verwenden",
    tx_viewingFee: "Besichtigungsgebühr",
    tx_deposit: "Buchungsanzahlung",
    tx_rent: "Monatsmiete",
    tx_success: "Erfolgreich",
    tx_pending: "USSD-Genehmigung ausstehend",
    tx_failed: "Fehlgeschlagen",
    method_mobileMoney: "Mobile Money · USD / ZiG",
    methodOne_mobileMoney: "Mobile Money · NetOne",
    method_cashDeposit: "Bareinzahlung / Geldbörse",
    method_zimswitch: "ZiG-Bankkarte",
    method_visa: "Visa / Mastercard",

    notifications_title: "Benachrichtigungen",
    notifications_subtitle: "Push-Einstellungen",
    notifications_stayInLoop: "Bleiben Sie informiert",
    notifications_info:
      "Verwalten Sie, welche Benachrichtigungen Sie in der App erhalten.",
    notifications_footer:
      "Push-Benachrichtigungen können Geräteberechtigungen erfordern. Sie können Ihre Auswahl jederzeit auf diesem Bildschirm ändern.",
    notifications_groupProperty: "Immobilienalarme",
    notifications_groupBooking: "Buchungen & Zahlungen",
    notifications_groupApp: "App-Updates",
    notif_newAlerts: "Neue Immobilien-Alerts",
    notif_newAlertsDesc:
      "Sie werden benachrichtigt, wenn neue Inserate hinzugefügt werden, die Ihrer Suche entsprechen.",
    notif_priceDrops: "Preissenkungen & Angebote",
    notif_priceDropsDesc:
      "Erfahren Sie zuerst von Preissenkungen, Aktionen und Sonderangeboten.",
    notif_bookingReminders: "Buchungserinnerungen",
    notif_bookingRemindersDesc:
      "Erinnerungen an kommende Besichtigungen, Anzahlungen und Einzugstermine.",
    notif_paymentUpdates: "Zahlungsupdates",
    notif_paymentUpdatesDesc:
      "Sofortige Updates zu Zahlungsbestätigungen, Belegen und Fehlern.",
    notif_appUpdates: "App-Updates & Angebote",
    notif_appUpdatesDesc:
      "Produktupdates, neue Funktionen und exklusive App-Angebote.",

    security_title: "Sicherheit",
    security_subtitle: "Passwort & Kontosicherheit",
    security_signIn: "Anmeldemethode",
    security_changePassword: "Passwort ändern",
    security_lastChanged: "Vor 3 Monaten geändert",
    security_auth: "Authentifizierung",
    security_biometrics: "Face ID / Touch ID aktivieren",
    security_biometricsDesc:
      "Entsperren und Zahlungen mit Face ID oder Fingerabdruck bestätigen.",
    security_twoFA: "Zwei-Faktor-Authentifizierung (2FA)",
    security_twoFADesc:
      "Zusätzliche Sicherheit durch einen Einmalcode bei der Anmeldung.",
    security_account: "Konto",
    security_deleteAccount: "Konto löschen",
    security_deleteDesc:
      "Entfernt dauerhaft Ihr Profil, Ihre Buchungen und Ihren Zahlungsverlauf. Dies kann nicht rückgängig gemacht werden.",
    security_changeTitle: "Passwort ändern",
    security_changeSub:
      "Wählen Sie ein sicheres Passwort mit mindestens 6 Zeichen.",
    security_currentPassword: "Aktuelles Passwort",
    security_newPassword: "Neues Passwort",
    security_confirmPassword: "Neues Passwort bestätigen",
    security_updatePassword: "Passwort aktualisieren",
    security_deleteTitle: "Konto löschen?",
    security_deleteBody:
      "Sie verlieren den Zugriff auf Ihre Buchungen, gespeicherten Immobilien und Ihr Guthaben. Diese Aktion ist dauerhaft.",
    security_goBack: "Zurück",
    security_continue: "Weiter",
    security_finalTitle: "Endgültige Bestätigung",
    security_finalBody:
      "Geben Sie unten DELETE ein, um Ihr Konto dauerhaft zu löschen.",
    security_permanentlyDelete: "Dauerhaft löschen",
    security_alertNotAvailable: "Nicht verfügbar",
    security_alertNotAvailableBody:
      "Biometrische Authentifizierung wird im Browser nicht unterstützt.",
    security_alertNotSetUp: "Nicht eingerichtet",
    security_alertNotSetUpBody:
      "Auf diesem Gerät wurden keine unterstützten Biometrien gefunden. Richten Sie zuerst Face ID oder einen Fingerabdruck ein.",
    security_alertEnabled: "Aktiviert",
    security_alertEnabledBody: "Biometrische Anmeldung ist jetzt aktiviert.",
    security_alertDisabled: "Deaktiviert",
    security_alertDisabledBody:
      "Die biometrische Anmeldung wurde deaktiviert.",
    security_alertIncomplete: "Unvollständig",
    security_alertIncompleteBody: "Bitte füllen Sie alle Passwortfelder aus.",
    security_alertWeak: "Schwaches Passwort",
    security_alertWeakBody: "Das Passwort muss mindestens 6 Zeichen haben.",
    security_alertMismatch: "Keine Übereinstimmung",
    security_alertMismatchBody:
      "Neues Passwort und Bestätigung stimmen nicht überein.",
    security_alertUpdated: "Ihr Passwort wurde aktualisiert.",
    security_alertIncorrect: "Falsch",
    security_alertIncorrectBody:
      "Geben Sie DELETE ein, um das Löschen zu bestätigen.",
    security_alertRequest: "Anfrage erhalten",
    security_alertRequestBody:
      "Ihre Löschungsanfrage wurde übermittelt und innerhalb von 30 Tagen verarbeitet.",

    language_title: "Sprache & Region",
    language_subtitle: "App-Sprache wählen",
    language_search: "Sprachen suchen...",
    language_select: "Sprache auswählen",
    language_languages: "{count} Sprachen",
    language_synced:
      "Ihre Spracheinstellung wird auf allen Geräten synchronisiert.",
    language_noMatch: "Keine Sprache passt zu \"{query}\"",
    language_confirmTitle: "Sprache ändern?",
    language_confirmBody:
      "App auf {name} umstellen? Die gesamte Oberfläche wird übersetzt.",
    language_switch: "Sprache wechseln",
    language_keep: "Aktuell behalten",

    help_title: "Hilfecenter",
    help_subtitle: "Wie können wir helfen?",
    help_search: "Hilfeartikel suchen...",
    help_faq: "FAQ",
    help_contact: "Kontakt",
    help_showing:
      "Ergebnisse für \"{query}\" — überprüfen Sie die FAQ-Kategorien oder kontaktieren Sie uns.",
    help_team:
      "Unser Team ist für Sie da. Wählen Sie einen Kanal und wir melden uns schnell.",
    help_office: "Büroadresse",
    help_address: "12 Borrowdale Road, Harare, Simbabwe",
    help_hours: "Mo – Sa · 8:00 – 18:00 Uhr",
    faq_bookings: "Buchungen",
    faq_payments: "Zahlungen",
    faq_account: "Konto",
    faq_cancelQuestion: "Wie storniere ich eine Besichtigung?",
    faq_cancelAnswer:
      "Öffnen Sie Meine Buchungen, wählen die kommende Besichtigung und tippen 'Buchung stornieren'. Stornierungen mehr als 24 Stunden vorher sind kostenlos.",
    faq_rescheduleQuestion: "Kann ich eine Buchung verschieben?",
    faq_rescheduleAnswer:
      "Ja. Kontaktieren Sie den Agenten über die Buchungsdetails oder unser Support-Team und wir verschieben die Besichtigung.",
    faq_depositQuestion: "Was passiert mit meiner Anzahlung?",
    faq_depositAnswer:
      "Anzahlungen werden sicher aufbewahrt und auf Ihre Einzugskosten angerechnet. Sie sind vollständig erstattungsfähig, wenn die Immobilie nicht wie beschrieben geliefert wird.",
    faq_methodsQuestion: "Welche Zahlungsmethoden werden unterstützt?",
    faq_methodsAnswer:
      "Wir akzeptieren EcoCash, OneMoney, InnBucks, Zimswitch und USD Visa/Mastercard. Sie können Ihre Standardmethode in Zahlungen & Geldbörse ändern.",
    faq_ussdQuestion: "Wie erhalte ich eine USSD-Zahlungsaufforderung?",
    faq_ussdAnswer:
      "Bei Mobile-Money-Zahlungen erhält Ihre registrierte Nummer eine EcoCash- oder OneMoney-USSD-Aufforderung. Bestätigen Sie sie zum Abschluss.",
    faq_refundQuestion: "Wann wird meine Erstattung verarbeitet?",
    faq_refundAnswer:
      "Genehmigte Erstattungen werden innerhalb von 3–5 Werktagen über die ursprüngliche Zahlungsmethode verarbeitet.",
    faq_passwordQuestion: "Wie ändere ich mein Passwort?",
    faq_passwordAnswer:
      "Gehen Sie zu Sicherheit in Ihrem Profil und tippen Sie 'Passwort ändern'. Sie müssen Ihr aktuelles Passwort verifizieren.",
    faq_biometricsQuestion: "Wie aktiviere ich Face ID / Touch ID?",
    faq_biometricsAnswer:
      "Öffnen Sie Sicherheit und aktivieren Sie 'Face ID / Touch ID'. Ihr Gerät fordert Sie zur einmaligen Authentifizierung auf.",
    faq_deleteQuestion: "Wie lösche ich mein Konto?",
    faq_deleteAnswer:
      "Gehen Sie zu Sicherheit > Konto löschen. Sie müssen zweimal bestätigen, einschließlich der Eingabe von DELETE. Ihre Daten werden in 30 Tagen gelöscht.",
    contact_call: "Kundensupport anrufen",
    contact_callSub: "Mo–So, 8–18 Uhr",
    contact_whatsapp: "WhatsApp-Support",
    contact_whatsappSub: "Antwort innerhalb von 5 Minuten",
    contact_email: "E-Mail senden",
    contact_emailAddr: "support@restate.co.zw",
    contact_liveChat: "Live-Chat",
    contact_liveChatSub: "Jetzt mit einem Agenten chatten",
    contact_liveChatAlert: "Live-Chat",
    contact_liveChatBody:
      "Sie werden mit dem nächsten verfügbaren Support-Agenten verbunden...",

    invite_title: "Freunde einladen",
    invite_bannerTitle: "Freunde einladen & Belohnungen verdienen",
    invite_bannerBody:
      "Verdienen Sie 25 USD für jeden Freund, der seine erste Immobilie bucht.",
    invite_referralCode: "Ihr Empfehlungscode",
    invite_shareHint:
      "Teilen Sie diesen Code oder Link — Sie verdienen Belohnungen für jede neue Anmeldung.",
    invite_copyCode: "Code kopieren",
    invite_copied: "Kopiert!",
    invite_shareLink: "Empfehlungslink teilen",
    invite_invitedFriends: "Eingeladene Freunde",
    invite_rewarded: "{count} belohnt",
    invite_statusPending: "Ausstehend",
    invite_statusRewarded: "Belohnt",
    invite_terms:
      "Belohnungen werden auf Ihre Geldbörse ausgezahlt, sobald der eingeladene Freund die erste Buchung abschließt. Bedingungen gelten.",
    invite_jointAlert: "Beigetreten · {date}",
    invite_invitedAlert: "Eingeladen · {date}",
    invite_shared: "Geteilt",
    invite_sharedBody: "Danke fürs Teilen!",
    invite_errorBody: "Teilen konnte nicht geöffnet werden.",

    property_agent: "Agent",
    property_overview: "Überblick",
    property_facilities: "Ausstattung",
    property_gallery: "Galerie",
    property_location: "Standort",
    property_price: "Preis",
    property_bookNow: "Jetzt buchen",
    property_viewAll: "Alle ansehen",
    property_beds: "{count} Schlafzimmer",
    property_baths: "{count} Badezimmer",
    property_area: "{count} m²",
    property_reviews: "({count} Bewertungen)",
  },
  ar: {
    common_cancel: "إلغاء",
    common_confirm: "تأكيد",
    common_success: "نجاح",
    common_error: "خطأ",

    tab_home: "الرئيسية",
    tab_explore: "استكشاف",
    tab_profile: "الملف الشخصي",

    home_greeting: "صباح الخير",
    home_featured: "مميز",
    home_seeAll: "عرض الكل",
    home_recommendation: "توصيتنا",
    search_placeholder: "ابحث عن أي شيء",

    explore_title: "ابحث عن منزلك المثالي",
  explore_found: "تم العثور على {count} عقارات",

    profile_title: "الملف الشخصي",
    settings_bookings: "حجوزاتي",
    settings_payments: "المدفوعات",
    settings_profile: "الملف الشخصي",
    profile_editTitle: "تعديل الملف الشخصي",
    profile_editSubtitle: "حدّث صورتك أو اسمك",
    profile_photo: "صورة الملف الشخصي",
    profile_changePhoto: "تغيير الصورة",
    profile_name: "الاسم الكامل",
    profile_namePlaceholder: "أدخل اسمك الكامل",
    profile_save: "حفظ التغييرات",
    profile_saving: "جارٍ الحفظ...",
    profile_updated: "تم تحديث ملفك الشخصي.",
    profile_updateError: "تعذر تحديث ملفك الشخصي. يرجى المحاولة مرة أخرى.",
    profile_nameRequired: "يرجى إدخال اسمك.",
    profile_photoPermission: "يلزم إذن معرض الصور لتغيير صورتك.",
    profile_photoError: "تعذر فتح معرض الصور. يرجى المحاولة مرة أخرى.",
    profile_noChanges: "لا توجد تغييرات لحفظها.",
    settings_notifications: "الإشعارات",
    settings_security: "الأمان",
    settings_language: "اللغة",
    settings_help: "مركز المساعدة",
    settings_invite: "دعوة الأصدقاء",
    settings_logout: "تسجيل الخروج",
    logout_success: "تم تسجيل الخروج بنجاح",
    logout_error: "فشل تسجيل الخروج",

    bookings_title: "حجوزاتي",
    bookings_upcoming: "القادمة",
    bookings_completed: "المكتملة",
    bookings_cancelled: "الملغاة",
    bookings_cancelBooking: "إلغاء الحجز",
    bookings_directions: "الاتجاهات",
    bookings_viewingFee: "رسوم المعاينة",
    bookings_deposit: "وديعة",
    bookings_noUpcoming: "لا توجد حجوزات قادمة",
    bookings_noCompleted: "لا توجد حجوزات مكتملة",
    bookings_noCancelled: "لا توجد حجوزات ملغاة",
    bookings_cancelTitle: "إلغاء الحجز؟",
    bookings_cancelMessage:
      "سيتم إلغاء {property} في {date}. قد تُطبق رسوم إلغاء وفقاً لسياسة المضيف.",
    bookings_keepBooking: "الاحتفاظ بالحجز",
    bookings_yesCancel: "نعم، إلغاء",
    bookings_cancelledAlert: "تم إلغاء الحجز",
    bookings_cancelledBody:
      "تمت إزالة {property} من حجوزاتك.",

    payments_title: "المدفوعات والمحفظة",
    payments_walletBalance: "رصيد محفظتي",
    payments_availableBalance: "الرصيد المتاح بالعملة {currency}",
    payments_paymentMethods: "طرق الدفع",
    payments_transactionHistory: "سجل المعاملات",
    payments_viewAll: "عرض الكل",
    payments_phoneLabel: "رقم الهاتف",
    payments_phonePrompt:
      "أدخل رقم {method} الذي سيستلم طلب التفويض عبر USSD.",
    payments_numberSaved: "تم حفظ الرقم",
    payments_saveNumber: "حفظ واستخدام هذا الرقم",
    tx_viewingFee: "رسوم معاينة العقار",
    tx_deposit: "وديعة الحجز",
    tx_rent: "الإيجار الشهري",
    tx_success: "ناجح",
    tx_pending: "بانتظار موافقة USSD",
    tx_failed: "فشل",
    method_mobileMoney: "النقود المحمولة · USD / ZiG",
    methodOne_mobileMoney: "النقود المحمولة · NetOne",
    method_cashDeposit: "إيداع نقدي / محفظة",
    method_zimswitch: "بطاقة بنكية ZiG",
    method_visa: "فيزا / ماستركارد",

    notifications_title: "الإشعارات",
    notifications_subtitle: "تفضيلات الإشعارات",
    notifications_stayInLoop: "ابقَ على اطلاع",
    notifications_info: "إدارة الإشعارات التي تستلمها أثناء استخدام التطبيق.",
    notifications_footer:
      "قد تتطلب الإشعارات إذن الجهاز. يمكنك تغيير خياراتك في أي وقت من هذه الشاشة.",
    notifications_groupProperty: "تنبيهات العقارات",
    notifications_groupBooking: "الحجوزات والمدفوعات",
    notifications_groupApp: "تحديثات التطبيق",
    notif_newAlerts: "تنبيهات العقارات الجديدة",
    notif_newAlertsDesc:
      "احصل على إشعار عند إضافة قوائم جديدة تطابق بحثك.",
    notif_priceDrops: "انخفاض الأسعار والعروض",
    notif_priceDropsDesc:
      "كن أول من يعرف عن تخفيضات الأسعار والعروض الخاصة.",
    notif_bookingReminders: "تذكيرات الحجز",
    notif_bookingRemindersDesc:
      "تذكير بالمعاينات القادمة والودائع وتواريخ الانتقال.",
    notif_paymentUpdates: "تحديثات الدفع",
    notif_paymentUpdatesDesc:
      "تحديثات فورية حول تأكيدات الدفع والإيصالات والإخفاقات.",
    notif_appUpdates: "تحديثات التطبيق والعروض",
    notif_appUpdatesDesc:
      "تحديثات المنتج والميزات الجديدة والعروض الحصرية.",

    security_title: "الأمان",
    security_subtitle: "كلمة المرور وأمان الحساب",
    security_signIn: "طريقة تسجيل الدخول",
    security_changePassword: "تغيير كلمة المرور",
    security_lastChanged: "تم التغيير منذ 3 أشهر",
    security_auth: "المصادقة",
    security_biometrics: "تفعيل Face ID / Touch ID",
    security_biometricsDesc:
      "افتح ووافق على المدفوعات باستخدام Face ID أو بصمة إصبعك.",
    security_twoFA: "المصادقة الثنائية (2FA)",
    security_twoFADesc:
      "أضف طبقة أمان إضافية برمز لمرة واحدة عند تسجيل الدخول.",
    security_account: "الحساب",
    security_deleteAccount: "حذف الحساب",
    security_deleteDesc:
      "يحذف بشكل دائم ملفك وحجوزاتك وسجل مدفوعاتك. لا يمكن التراجع.",
    security_changeTitle: "تغيير كلمة المرور",
    security_changeSub: "اختر كلمة مرور قوية من 6 أحرف على الأقل.",
    security_currentPassword: "كلمة المرور الحالية",
    security_newPassword: "كلمة مرور جديدة",
    security_confirmPassword: "تأكيد كلمة المرور الجديدة",
    security_updatePassword: "تحديث كلمة المرور",
    security_deleteTitle: "حذف حسابك؟",
    security_deleteBody:
      "ستفقد الوصول إلى حجوزاتك والعقارات المحفوظة ورصيد محفظتك. هذا الإجراء دائم.",
    security_goBack: "رجوع",
    security_continue: "متابعة",
    security_finalTitle: "التأكيد النهائي",
    security_finalBody: "اكتب DELETE أدناه لحذف حسابك نهائياً.",
    security_permanentlyDelete: "حذف نهائي",
    security_alertNotAvailable: "غير متوفر",
    security_alertNotAvailableBody:
      "المصادقة البيومترية غير مدعومة في المتصفح.",
    security_alertNotSetUp: "غير مهيأ",
    security_alertNotSetUpBody:
      "لم يتم العثور على بيومترية مدعومة على هذا الجهاز. قم بإعداد Face ID أو بصمة الإصبع أولاً.",
    security_alertEnabled: "مفعل",
    security_alertEnabledBody: "تم تفعيل تسجيل الدخول البيومتري الآن.",
    security_alertDisabled: "معطل",
    security_alertDisabledBody: "تم تعطيل تسجيل الدخول البيومتري.",
    security_alertIncomplete: "غير مكتمل",
    security_alertIncompleteBody: "يرجى ملء جميع حقول كلمة المرور.",
    security_alertWeak: "كلمة مرور ضعيفة",
    security_alertWeakBody: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.",
    security_alertMismatch: "غير متطابق",
    security_alertMismatchBody:
      "كلمة المرور الجديدة والتأكيد غير متطابقين.",
    security_alertUpdated: "تم تحديث كلمة المرور الخاصة بك.",
    security_alertIncorrect: "غير صحيح",
    security_alertIncorrectBody: "اكتب DELETE لتأكيد حذف الحساب.",
    security_alertRequest: "تم استلام الطلب",
    security_alertRequestBody:
      "تم إرسال طلب حذف حسابك وسيتم معالجته خلال 30 يوماً.",

    language_title: "اللغة والمنطقة",
    language_subtitle: "اختر لغة التطبيق",
    language_search: "ابحث في اللغات...",
    language_select: "اختر اللغة",
    language_languages: "{count} لغات",
    language_synced: "تتم مزامنة تفضيل اللغة عبر جميع أجهزتك.",
    language_noMatch: "لا توجد لغات تطابق \"{query}\"",
    language_confirmTitle: "تغيير اللغة؟",
    language_confirmBody:
      "هل تريد تحويل التطبيق إلى {name}؟ ستتم ترجمة الواجهة بالكامل.",
    language_switch: "تغيير اللغة",
    language_keep: "الاحتفاظ بالحالية",

    help_title: "مركز المساعدة",
    help_subtitle: "كيف يمكننا المساعدة؟",
    help_search: "ابحث في مقالات المساعدة...",
    help_faq: "الأسئلة الشائعة",
    help_contact: "اتصل بنا",
    help_showing:
      "عرض نتائج \"{query}\" — تحقق من فئات الأسئلة الشائعة أو اتصل بنا.",
    help_team:
      "فريقنا هنا لخدمتك. اختر قناة وسنرد عليك بسرعة.",
    help_office: "عنوان المكتب",
    help_address: "12 طريق Borrowdale، هراري، زيمبابوي",
    help_hours: "الاثنين – السبت · 8:00 ص – 6:00 م",
    faq_bookings: "الحجوزات",
    faq_payments: "المدفوعات",
    faq_account: "الحساب",
    faq_cancelQuestion: "كيف ألغي معاينة عقار؟",
    faq_cancelAnswer:
      "افتح حجوزاتي، اختر المعاينة القادمة واضغط 'إلغاء الحجز'. عمليات الإلغاء قبل أكثر من 24 ساعة مجانية.",
    faq_rescheduleQuestion: "هل يمكنني إعادة جدولة حجز؟",
    faq_rescheduleAnswer:
      "نعم. اتصل بالوكيل من صفحة تفاصيل الحجز أو بفريق الدعم وسنعيد جدولة المعاينة.",
    faq_depositQuestion: "ماذا يحدث لوديعتي بعد الحجز؟",
    faq_depositAnswer:
      "يتم الاحتفاظ بالودائع بأمان وتطبيقها على تكاليف الانتقال. قابلة للاسترداد بالكامل إذا لم يتم تسليم العقار كما هو موصوف.",
    faq_methodsQuestion: "ما طرق الدفع المدعومة؟",
    faq_methodsAnswer:
      "نقبل EcoCash وOneMoney وInnBucks وZimswitch وفيزا/ماستركارد USD. يمكنك تغيير الطريقة الافتراضية في المدفوعات والمحفظة.",
    faq_ussdQuestion: "كيف أستلم دعوة دفع USSD؟",
    faq_ussdAnswer:
      "عند الدفع بالنقود المحمولة، يستلم رقمك المسجل دعوة USSD من EcoCash أو OneMoney. وافق عليها لإتمام المعاملة فوراً.",
    faq_refundQuestion: "متى تتم معالجة استردادي؟",
    faq_refundAnswer:
      "تتم معالجة المبالغ المستردة المعتمدة خلال 3–5 أيام عمل وتُعاد عبر طريقة الدفع الأصلية.",
    faq_passwordQuestion: "كيف أغير كلمة المرور؟",
    faq_passwordAnswer:
      "انتقل إلى الأمان في ملفك الشخصي واضغط 'تغيير كلمة المرور' واتبع الخطوات.",
    faq_biometricsQuestion: "كيف أفعّل Face ID / Touch ID؟",
    faq_biometricsAnswer:
      "افتح الأمان ثم فعّل 'Face ID / Touch ID'. سيطلب جهازك المصادقة مرة واحدة للتأكيد.",
    faq_deleteQuestion: "كيف أحذف حسابي؟",
    faq_deleteAnswer:
      "انتقل إلى الأمان > حذف الحساب. ستحتاج للتأكيد مرتين بما في ذلك كتابة DELETE. تُحذف بياناتك خلال 30 يوماً.",
    contact_call: "اتصال دعم العملاء",
    contact_callSub: "الاثنين–الأحد، 8 ص – 6 م",
    contact_whatsapp: "دعم واتساب",
    contact_whatsappSub: "الرد خلال 5 دقائق",
    contact_email: "راسلنا عبر البريد",
    contact_emailAddr: "support@restate.co.zw",
    contact_liveChat: "دردشة مباشرة",
    contact_liveChatSub: "تحدث مع وكيل الآن",
    contact_liveChatAlert: "دردشة مباشرة",
    contact_liveChatBody: "جارٍ توصيلك بأقرب وكيل دعم متاح...",

    invite_title: "دعوة الأصدقاء",
    invite_bannerTitle: "ادعُ الأصدقاء واربح المكافآت",
    invite_bannerBody:
      "اربح 25 دولاراً عن كل صديق يحجز أول عقار له.",
    invite_referralCode: "رمز الإحالة الخاص بك",
    invite_shareHint:
      "شارك هذا الرمز أو الرابط — ستربح مكافآت مع كل تسجيل جديد.",
    invite_copyCode: "نسخ الرمز",
    invite_copied: "تم النسخ!",
    invite_shareLink: "مشاركة رابط الإحالة",
    invite_invitedFriends: "الأصدقاء المدعوون",
    invite_rewarded: "{count} حصلوا على مكافأة",
    invite_statusPending: "قيد الانتظار",
    invite_statusRewarded: "حصل على مكافأة",
    invite_terms:
      "تُدفع المكافآت إلى محفظتك بمجرد إتمام الصديق المدعو أول حجز ناجح. تنطبق الشروط والأحكام.",
    invite_jointAlert: "انضم · {date}",
    invite_invitedAlert: "دعوة · {date}",
    invite_shared: "تمت المشاركة",
    invite_sharedBody: "شكراً للمشاركة!",
    invite_errorBody: "تعذر فتح نافذة المشاركة.",

    property_agent: "الوكيل",
    property_overview: "نظرة عامة",
    property_facilities: "المرافق",
    property_gallery: "معرض الصور",
    property_location: "الموقع",
    property_price: "السعر",
    property_bookNow: "احجز الآن",
    property_viewAll: "عرض الكل",
    property_beds: "{count} غرف نوم",
    property_baths: "{count} حمامات",
    property_area: "{count} م²",
    property_reviews: "({count} تقييمات)",
  },
  zh: {
    common_cancel: "取消",
    common_confirm: "确认",
    common_success: "成功",
    common_error: "错误",

    tab_home: "首页",
    tab_explore: "探索",
    tab_profile: "个人资料",

    home_greeting: "早上好",
    home_featured: "精选",
    home_seeAll: "查看全部",
    home_recommendation: "我们的推荐",
    search_placeholder: "搜索任何内容",

    explore_title: "寻找您的理想家园",
  explore_found: "找到 {count} 处房产",

    profile_title: "个人资料",
    settings_bookings: "我的预订",
    settings_payments: "付款",
    settings_profile: "个人资料",
    profile_editTitle: "编辑个人资料",
    profile_editSubtitle: "更新您的照片或姓名",
    profile_photo: "个人照片",
    profile_changePhoto: "更换照片",
    profile_name: "姓名",
    profile_namePlaceholder: "请输入您的姓名",
    profile_save: "保存更改",
    profile_saving: "正在保存...",
    profile_updated: "您的个人资料已更新。",
    profile_updateError: "无法更新您的个人资料，请重试。",
    profile_nameRequired: "请输入您的姓名。",
    profile_photoPermission: "更换照片需要照片库权限。",
    profile_photoError: "无法打开照片库，请重试。",
    profile_noChanges: "没有需要保存的更改。",
    settings_notifications: "通知",
    settings_security: "安全",
    settings_language: "语言",
    settings_help: "帮助中心",
    settings_invite: "邀请好友",
    settings_logout: "退出登录",
    logout_success: "已成功退出登录",
    logout_error: "退出登录失败",

    bookings_title: "我的预订",
    bookings_upcoming: "即将到来",
    bookings_completed: "已完成",
    bookings_cancelled: "已取消",
    bookings_cancelBooking: "取消预订",
    bookings_directions: "路线",
    bookings_viewingFee: "看房费",
    bookings_deposit: "定金",
    bookings_noUpcoming: "暂无即将到来的预订",
    bookings_noCompleted: "暂无已完成的预订",
    bookings_noCancelled: "暂无已取消的预订",
    bookings_cancelTitle: "取消预订？",
    bookings_cancelMessage:
      "{property}（{date}）将被取消。根据房东政策，可能需要支付取消费用。",
    bookings_keepBooking: "保留预订",
    bookings_yesCancel: "是，取消",
    bookings_cancelledAlert: "预订已取消",
    bookings_cancelledBody:
      "{property} 已从您的预订中移除。",

    payments_title: "付款与钱包",
    payments_walletBalance: "我的钱包余额",
    payments_availableBalance: "{currency} 可用余额",
    payments_paymentMethods: "付款方式",
    payments_transactionHistory: "交易记录",
    payments_viewAll: "查看全部",
    payments_phoneLabel: "电话号码",
    payments_phonePrompt:
      "输入 {method} 号码，该号码将接收 USSD 支付授权提示。",
    payments_numberSaved: "号码已保存",
    payments_saveNumber: "保存并使用此号码",
    tx_viewingFee: "房产看房费",
    tx_deposit: "预订定金",
    tx_rent: "月租",
    tx_success: "成功",
    tx_pending: "等待 USSD 审批",
    tx_failed: "失败",
    method_mobileMoney: "移动支付 · USD / ZiG",
    methodOne_mobileMoney: "移动支付 · NetOne",
    method_cashDeposit: "现金存款/钱包",
    method_zimswitch: "ZiG 银行卡",
    method_visa: "Visa / Mastercard",

    notifications_title: "通知",
    notifications_subtitle: "推送偏好",
    notifications_stayInLoop: "保持关注",
    notifications_info:
      "管理您在使用应用时收到的通知。",
    notifications_footer:
      "推送通知可能需要设备权限。您可以随时在此屏幕更改您的选择。",
    notifications_groupProperty: "房产提醒",
    notifications_groupBooking: "预订与付款",
    notifications_groupApp: "应用更新",
    notif_newAlerts: "新房产提醒",
    notif_newAlertsDesc:
      "当有与您的搜索匹配的新房源时收到通知。",
    notif_priceDrops: "降价与优惠",
    notif_priceDropsDesc:
      "第一时间了解降价、促销和特别优惠。",
    notif_bookingReminders: "预订提醒",
    notif_bookingRemindersDesc:
      "即将进行的看房、定金和入住日期的提醒。",
    notif_paymentUpdates: "付款更新",
    notif_paymentUpdatesDesc:
      "付款确认、收据和失败的即时更新。",
    notif_appUpdates: "应用更新与优惠",
    notif_appUpdatesDesc:
      "产品更新、新功能和应用专属优惠。",

    security_title: "安全",
    security_subtitle: "密码与账户安全",
    security_signIn: "登录方式",
    security_changePassword: "更改密码",
    security_lastChanged: "3 个月前更改",
    security_auth: "身份验证",
    security_biometrics: "启用 Face ID / Touch ID",
    security_biometricsDesc:
      "使用 Face ID 或指纹解锁并批准付款。",
    security_twoFA: "两步验证 (2FA)",
    security_twoFADesc:
      "通过一次性代码增添一层额外的安全保护。",
    security_account: "账户",
    security_deleteAccount: "删除账户",
    security_deleteDesc:
      "永久删除您的个人资料、预订和付款记录。此操作无法撤销。",
    security_changeTitle: "更改密码",
    security_changeSub: "请选择至少 6 个字符的强密码。",
    security_currentPassword: "当前密码",
    security_newPassword: "新密码",
    security_confirmPassword: "确认新密码",
    security_updatePassword: "更新密码",
    security_deleteTitle: "删除您的账户？",
    security_deleteBody:
      "您将失去对预订、已保存房产和钱包余额的访问权限。此操作不可撤销。",
    security_goBack: "返回",
    security_continue: "继续",
    security_finalTitle: "最终确认",
    security_finalBody: "请输入 DELETE 以永久删除您的账户。",
    security_permanentlyDelete: "永久删除",
    security_alertNotAvailable: "不可用",
    security_alertNotAvailableBody:
      "浏览器不支持生物识别认证。",
    security_alertNotSetUp: "未设置",
    security_alertNotSetUpBody:
      "未在此设备上找到受支持的生物识别。请先设置 Face ID 或指纹。",
    security_alertEnabled: "已启用",
    security_alertEnabledBody: "生物识别登录现已启用。",
    security_alertDisabled: "已禁用",
    security_alertDisabledBody: "生物识别登录已关闭。",
    security_alertIncomplete: "不完整",
    security_alertIncompleteBody: "请填写所有密码字段。",
    security_alertWeak: "密码强度不足",
    security_alertWeakBody: "密码必须至少包含 6 个字符。",
    security_alertMismatch: "不匹配",
    security_alertMismatchBody: "新密码与确认密码不一致。",
    security_alertUpdated: "您的密码已更新。",
    security_alertIncorrect: "不正确",
    security_alertIncorrectBody: "请输入 DELETE 以确认删除账户。",
    security_alertRequest: "已收到请求",
    security_alertRequestBody:
      "您的账户删除请求已提交，将在 30 天内处理。",

    language_title: "语言与地区",
    language_subtitle: "选择应用语言",
    language_search: "搜索语言...",
    language_select: "选择语言",
    language_languages: "{count} 种语言",
    language_synced: "您的语言偏好将在所有设备上同步。",
    language_noMatch: "没有符合“{query}”的语言",
    language_confirmTitle: "更改语言？",
    language_confirmBody: "将应用切换到 {name}？整个界面将被翻译。",
    language_switch: "切换语言",
    language_keep: "保留当前语言",

    help_title: "帮助中心",
    help_subtitle: "我们如何帮助您？",
    help_search: "搜索帮助文章...",
    help_faq: "常见问题",
    help_contact: "联系我们",
    help_showing:
      "显示“{query}”的结果 — 请查看常见问题类别或联系我们。",
    help_team: "我们的团队随时为您服务。选择一个渠道，我们会尽快回复。",
    help_office: "办公地址",
    help_address: "哈拉雷 Borrowdale 路 12 号，津巴布韦",
    help_hours: "周一 – 周六 · 上午 8:00 – 下午 6:00",
    faq_bookings: "预订",
    faq_payments: "付款",
    faq_account: "账户",
    faq_cancelQuestion: "如何取消房产看房？",
    faq_cancelAnswer:
      "打开我的预订，选择即将进行的看房，然后点击“取消预订”。提前 24 小时以上取消免费。",
    faq_rescheduleQuestion: "可以重新安排预订吗？",
    faq_rescheduleAnswer:
      "可以。从预订详情页联系经纪人，或联系我们的支持团队重新安排看房时间。",
    faq_depositQuestion: "预订后的定金会怎样？",
    faq_depositAnswer:
      "预订时支付的定金会安全保管，并用于您的入住费用。如果房产未按描述交付，可全额退款。",
    faq_methodsQuestion: "支持哪些付款方式？",
    faq_methodsAnswer:
      "我们接受 EcoCash、OneMoney、InnBucks、Zimswitch 和 USD Visa/Mastercard。您可以在付款与钱包中更改默认方式。",
    faq_ussdQuestion: "如何收到 USSD 付款提示？",
    faq_ussdAnswer:
      "使用移动支付时，您注册的手机号会收到 EcoCash 或 OneMoney 的 USSD 提示。批准后立即完成交易。",
    faq_refundQuestion: "退款何时处理？",
    faq_refundAnswer:
      "已批准的退款在 3–5 个工作日内处理，并通过原付款方式退回。",
    faq_passwordQuestion: "如何更改密码？",
    faq_passwordAnswer:
      "前往个人资料中的安全设置，点击“更改密码”并按照步骤操作。",
    faq_biometricsQuestion: "如何启用 Face ID / Touch ID？",
    faq_biometricsAnswer:
      "打开安全设置，然后打开“Face ID / Touch ID”。您的设备会提示您进行一次身份验证。",
    faq_deleteQuestion: "如何删除我的账户？",
    faq_deleteAnswer:
      "前往安全 > 删除账户。您需要确认两次，包括输入 DELETE。您的数据将在 30 天内删除。",
    contact_call: "客户支持热线",
    contact_callSub: "周一至周日，上午 8 点至下午 6 点",
    contact_whatsapp: "WhatsApp 支持",
    contact_whatsappSub: "5 分钟内回复",
    contact_email: "给我们发邮件",
    contact_emailAddr: "support@restate.co.zw",
    contact_liveChat: "在线聊天",
    contact_liveChatSub: "立即与客服聊天",
    contact_liveChatAlert: "在线聊天",
    contact_liveChatBody: "正在为您连接下一位客服...",

    invite_title: "邀请好友",
    invite_bannerTitle: "邀请好友，赚取奖励",
    invite_bannerBody:
      "每邀请一位好友完成首次房产预订，即可赚取 25 美元。",
    invite_referralCode: "您的推荐码",
    invite_shareHint:
      "分享此代码或链接 — 每次新注册您都会获得奖励。",
    invite_copyCode: "复制代码",
    invite_copied: "已复制！",
    invite_shareLink: "分享推荐链接",
    invite_invitedFriends: "已邀请的好友",
    invite_rewarded: "{count} 人获得奖励",
    invite_statusPending: "待处理",
    invite_statusRewarded: "已奖励",
    invite_terms:
      "好友在邀请下完成首次成功预订后，奖励将支付到您的钱包。适用条款与条件。",
    invite_jointAlert: "已加入 · {date}",
    invite_invitedAlert: "已邀请 · {date}",
    invite_shared: "已分享",
    invite_sharedBody: "感谢分享！",
    invite_errorBody: "无法打开分享面板。",

    property_agent: "经纪人",
    property_overview: "概述",
    property_facilities: "设施",
    property_gallery: "图库",
    property_location: "位置",
    property_price: "价格",
    property_bookNow: "立即预订",
    property_viewAll: "查看全部",
    property_beds: "{count} 张床",
    property_baths: "{count} 个浴室",
    property_area: "{count} 平方米",
    property_reviews: "（{count} 条评价）",
  },
};

export const supportedLanguages: { code: LanguageCode; name: string }[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "简体中文" },
];

interface I18nContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: keyof typeof en, params?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");

  const t = useCallback(
    (key: keyof typeof en, params?: Record<string, string | number>) => {
      let str =
        translations[language]?.[key] ?? translations.en[key] ?? String(key);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, String(v));
        });
      }
      return str;
    },
    [language]
  );

  const value = useMemo<I18nContextType>(
    () => ({
      language,
      setLanguage,
      t,
      isRTL: language === "ar",
    }),
    [language, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageProvider;