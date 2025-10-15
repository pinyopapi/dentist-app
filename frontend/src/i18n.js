const translations = {
  // Auth
  register: { hu: "Regisztráció", en: "Register" },
  login: { hu: "Bejelentkezés", en: "Login" },
  name: { hu: "Név", en: "Name" },
  email: { hu: "Email", en: "Email" },
  password: { hu: "Jelszó", en: "Password" },
  successRegister: { hu: "Sikeres regisztráció!", en: "User registered successfully!" },
  successLogin: { hu: "Sikeres bejelentkezés!", en: "Login successful!" },
  error: { hu: "Hiba történt", en: "An error occurred" },
  networkError: { hu: "Hálózati hiba", en: "Network error" },

  // Pages h1
  appointments: { hu: "Időpontok", en: "Appointments" },
  adminManageCalendar: { hu: "Admin: Naptár kezelése", en: "Admin: Manage Calendar" },
  dashboard: { hu: "Irányítópult", en: "Dashboard" },

  // Toast & Alerts
  slotAlreadyBooked: { hu: "Ez az időpont már foglalt!", en: "This slot is already booked!" },
  loginFirstGoogle: { hu: "Először jelentkezz be Google fiókkal!", en: "Please log in with Google first to book a slot." },
  slotBookedSuccess: { hu: "Időpont sikeresen lefoglalva!", en: "Slot successfully booked!" },
  bookingFailed: { hu: "Nem sikerült lefoglalni az időpontot", en: "Could not book this slot" },
  freeSlotCreated: { hu: "Szabad időpont létrehozva!", en: "Free slot created!" },
  createSlotError: { hu: "Nem sikerült létrehozni az időpontot", en: "Failed to create slot" },
  eventDeleted: { hu: "Időpont törölve", en: "Event deleted" },
  deleteSlotError: { hu: "Nem sikerült törölni az időpontot", en: "Failed to delete event" },
  confirmDeleteEvent: { hu: "Biztosan törölni szeretnéd ezt az időpontot?", en: "Are you sure you want to delete this event?" },

  // Admin gombok
  createFreeSlot: { hu: "Szabad időpont létrehozása", en: "Create Free Slot" },

  // AppointmentCalendar
  freeSlot: { hu: "Szabad időpont", en: "Free Slot" },
  bookedBy: { hu: "Foglalta:", en: "Booked by:" },

  // Google login gomb
  loginWithGoogle: { hu: "Jelentkezés Google fiókkal", en: "Login with Google to book slots" },

  // Navbar
  home: { hu: "Főoldal", en: "Home" },
  logout: { hu: "Kijelentkezés", en: "Logout" },
  admin: { hu: "Admin", en: "Admin" },
  appointmentsNav: { hu: "Időpontok", en: "Appointments" },
};

export default translations;