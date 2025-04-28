package routes

import (
	controllers "KawalPTN-API/controllers/admin"
	"KawalPTN-API/middleware"

	studentController "KawalPTN-API/controllers/student"

	fiber "github.com/gofiber/fiber/v2"
	// customerController "KawalPTN-API/controllers/customer"
)

func Setup(app *fiber.App) {
	admin := app.Group("/admin")

	admin.Post("/login", controllers.Login)
	admin.Post("/register", controllers.Register)
	admin.Get("/profile", controllers.Profile)
	admin.Get("/listUser/:id_users", controllers.IndexUsers)
	admin.Post("/logout", controllers.Logout)

	admin.Post("/createPacket", controllers.CreatePacket)
	admin.Get("/listPacket", controllers.IndexPacket)
	admin.Get("/viewPacket/:id", controllers.ShowPacket)
	admin.Put("/editPacket/:id", controllers.UpdatePacket)
	admin.Delete("/listPacket/:id", controllers.DeletePacket)

	admin.Get("/listStudent", controllers.IndexStudent)
	admin.Get("/viewStudent/:username", controllers.ShowStudent)
	admin.Delete("/listStudent/:username", controllers.DeleteStudent)
	admin.Put("/editStudent/:username", controllers.UpdateStudent)

	admin.Post("/createUniversity", controllers.CreateUniversity)
	admin.Get("/listUniversity", controllers.IndexUniversity)
	admin.Get("/viewUniversity/:id_ptn", controllers.ShowUniversity)
	admin.Put("/editUniversity/:id_ptn", controllers.UpdateUniversity)
	admin.Delete("/listUniversity/:id_ptn", controllers.DeleteUniversity)

	admin.Post("/createMajor", controllers.CreateMajor)
	admin.Get("/listMajor", controllers.IndexMajor)
	admin.Get("/viewMajor/:id_prodi", controllers.ShowMajor)
	admin.Put("/editMajor/:id_prodi", controllers.UpdateMajor)
	admin.Delete("/listMajor/:id_prodi", controllers.DeleteMajor)

	admin.Post("/createScore", controllers.CreateScore)
	admin.Get("/viewScore/:id_siswa", controllers.ShowScore)

	admin.Post("/createAnnouncement", controllers.CreateAnnouncement)
	admin.Get("/listAnnouncement", controllers.IndexAnnouncement)
	admin.Get("/viewAnnouncement/:id", controllers.ShowAnnouncement)
	admin.Put("/editAnnouncement/:id", controllers.UpdateAnnouncement)
	admin.Delete("/listAnnouncement/:id", controllers.DeleteAnnouncement)

	admin.Post("/createSekolah", controllers.CreateSekolah)
	admin.Get("/listSekolah", controllers.IndexSekolah)
	admin.Get("/viewSekolah/:id", controllers.ShowSekolah)
	admin.Put("/editSekolah/:id", controllers.UpdateSekolah)
	admin.Delete("/listSekolah/:id", controllers.DeleteSekolah)

	admin.Get("/listPayment", studentController.IndexPayment)
	admin.Get("/viewPayment/:id", studentController.ShowPayment)

	student := app.Group("/student")
	student.Post("/login", studentController.Login)
	student.Get("/profile", studentController.Profile)
	student.Post("/logout", studentController.Logout)

	student.Get("/listPacket", controllers.IndexPacket)
	student.Get("/viewPacket/:id", controllers.ShowPacket)

	student.Use(middleware.JWTMiddleware())
	student.Get("/myPacket", studentController.MyPacket)

	student.Post("/sendPayment", studentController.SendPayment)

	// //Manage Cashier
	// admin.Post("/cashier", controllers.CreateCashier)
	// admin.Get("/cashier/index", controllers.IndexCashier)
	// admin.Get("/cashier/show/:id", controllers.ShowCashier)
	// admin.Put("/cashier/update/:id", controllers.UpdateCashier)
	// admin.Delete("/cashier/delete/:id", controllers.DeleteCashier)

	// //Manage Category with Admin
	// admin.Post("/category", controllers.CreateCategory)
	// admin.Get("/category/index", controllers.IndexCategory)
	// admin.Get("/category/show/:id", controllers.ShowCategory)
	// admin.Put("/category/update/:id", controllers.UpdateCategory)
	// admin.Delete("/category/delete/:id", controllers.DeleteCategory)

	// //Manage Tabel with Admin
	// admin.Post("/table", controllers.CreateTable)
	// admin.Get("/table/index", controllers.IndexTable)
	// admin.Get("/table/show/:id", controllers.ShowTable)
	// admin.Put("/table/update/:id", controllers.UpdateTable)
	// admin.Delete("/table/delete/:id", controllers.DeleteTable)

	// //Manage Product with Admin
	// admin.Post("/product", controllers.CreateProduct)
	// admin.Get("/product/index", controllers.IndexProduct)
	// admin.Get("/product/show/:id", controllers.ShowProduct)
	// admin.Put("/product/update/:id", controllers.UpdateProduct)
	// admin.Delete("/product/delete/:id", controllers.DeleteProduct)

	// //manage Announcement with Admin
	// admin.Post("/announcement", controllers.CreateAnnouncement)
	// admin.Get("/announcement/index", controllers.IndexAnnouncement)
	// admin.Get("/announcement/show/:id", controllers.ShowAnnouncement)
	// admin.Put("/announcement/update/:id", controllers.UpdateAnnouncement)
	// admin.Delete("/announcement/delete/:id", controllers.DeleteAnnouncement)

	// //Auth Cashier
	// cashier := app.Group("/cashier")
	// cashier.Post("/login", cashierController.Login)
	// cashier.Use(middleware.RequiredLoginCashier)
	// cashier.Get("/profile", cashierController.Profile)
	// cashier.Post("/logout", cashierController.Logout)
	// //Approval Cashier
	// cashier.Put("/approvebooking/:id", cashierController.ApproveBooking)
	// cashier.Get("/getbookings", cashierController.GetBooking)
	// cashier.Put("/rejectbooking/:id", cashierController.RejectBooking)

	// //Auth Customer
	// customer := app.Group("/customer")
	// customer.Post("/register", customerController.RegisterCustomer)
	// customer.Post("/login", customerController.LoginCustomer)
	// customer.Use(middleware.RequiredLoginCustomer)
	// customer.Get("/profile", customerController.Profile)
	// customer.Post("/logout", customerController.Logout)

	// //BookingQueue Customer
	// customer.Post("/booking", customerController.CreateBooking)
	// customer.Get("/booking/index", customerController.IndexBooking)
	// customer.Get("/booking/show/:id", customerController.ShowBooking)
	// customer.Put("/booking/update/:id", customerController.UpdateBooking)
	// customer.Delete("/booking/delete/:id", customerController.DeleteBooking)

	// //Proof Of Payment Customer
	// customer.Post("/proof-of-payment", customerController.SendPayment)

}
