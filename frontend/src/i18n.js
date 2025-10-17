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
  adminManageCalendar: { hu: "Naptár kezelése", en: "Manage Calendar" },
  dashboard: { hu: "Dashboard", en: "Dashboard" },

  // Loading
  loading: { hu: "Betöltés...", en: "Loading..." },
  loadingCalendar: { hu: "Naptár betöltése...", en: "Loading calendar..." },

  genericError: { hu: "Hiba történt", en: "An error occurred" },

  // Labels
  start: { hu: "Kezdés", en: "Start" },
  end: { hu: "Befejezés", en: "End" },

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

  // Admin 
  createFreeSlot: { hu: "Szabad időpont létrehozása", en: "Create Free Slot" },
  durationMinutes: { hu: "Időtartam (perc)", en: "Duration (min)" },

  // AppointmentCalendar
  freeSlot: { hu: "Szabad időpont", en: "Free Slot" },
  bookedBy: { hu: "Foglalta:", en: "Booked by:" },
  booked: { hu: "Foglalt", en: "Booked" },

  // Google login btn
  loginWithGoogle: { hu: "Bejelentkezés Google fiókkal", en: "Login with Google to book slots" },

  // Navbar
  home: { hu: "Főoldal", en: "Home" },
  logout: { hu: "Kijelentkezés", en: "Logout" },
  admin: { hu: "Admin", en: "Admin" },
  adminCalendar: { hu: "Admin naptár", en: "Admin Calendar" },
  appointmentsNav: { hu: "Időpontok", en: "Appointments" },
  manageServices: { hu: "Szolgáltatások kezelése", en: "Manage Services" },

  //admin service
  services: { hu: "Szolgáltatások", en: "Services" },
  price: { hu: "Ár", en: "Price" },
  addService: { hu: "Hozzáadás", en: "Add Service" },
  serviceName: { hu: "Szolgáltatás név", en: "Service name" },
  edit: { hu: "Szerkesztés", en: "Edit" },
  delete: { hu: "Törlés", en: "Delete" },
  enterNewName: { hu: "Add meg az új nevet", en: "Enter new name" },
  enterNewPrice: { hu: "Add meg az új árat", en: "Enter new price" },
  confirmDeleteService: { hu: "Biztosan törlöd a szolgáltatást?", en: "Are you sure you want to delete this service?" },
  serviceAdded: { hu: "Szolgáltatás hozzáadva!", en: "Service added!" },
  serviceUpdated: { hu: "Szolgáltatás frissítve!", en: "Service updated!" },
  serviceDeleted: { hu: "Szolgáltatás törölve!", en: "Service deleted!" },
  fillAllFields: { hu: "Tölts ki minden mezőt!", en: "Please fill all fields!" },
  actionFailed: { hu: "Hiba történt!", en: "Action failed!" },
  nameRequired: { hu: "A név nem lehet üres!", en: "Name can not be empty!" },
  validPriceRequired: { hu: "Nem megfelelő szám!", en: "Invalid number!" },
  
  confirm: { hu: "Megerősít", en: "Confirm" },
  confirmBooking: { hu: "Biztosan le szeretnéd foglalni ezt az időpontot?", en: "Are you sure you want to book this slot?" },
  yes: { hu: "Igen", en: "Yes" },
  no: { hu: "Nem", en: "No" },
  ok: { hu: "OK", en: "OK" },
  cancel: { hu: "Mégse", en: "Cancel" },
  enterServiceName: { hu: "Add meg a szolgáltatás nevét:", en: "Enter the service name:" },
  editServiceDetails: { hu: "Szolgáltatás név szerkesztése:", en: "Edit the service name:" },
  enterServicePrice: { hu: "Add meg az árát:", en: "Enter the price:" },

};

export default translations;