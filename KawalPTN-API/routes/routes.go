package routes

import (
	controllers "KawalPTN-API/controllers/admin"
	"KawalPTN-API/middleware"

	studentController "KawalPTN-API/controllers/student"

	fiber "github.com/gofiber/fiber/v2"
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
	student.Post("/register", studentController.Register)
	student.Post("/logout", studentController.Logout)
	student.Put("/update/:nisn", studentController.UpdateStudent)
	student.Get("/listPacket", controllers.IndexPacket)
	student.Get("/viewPacket/:id", controllers.ShowPacket)

	student.Use(middleware.JWTMiddleware())
	student.Get("/myPacket", studentController.MyPacket)

	student.Post("/sendPayment", studentController.SendPayment)
}
