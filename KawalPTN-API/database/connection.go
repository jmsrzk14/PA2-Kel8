package database

import (
	"KawalPTN-API/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	conn, err := gorm.Open(mysql.Open("root:@tcp(localhost:3306)/pa02kel08"), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}

	DB = conn

	conn.AutoMigrate(
		&models.Sekolah_Sma{}, &models.Kelulusan{}, &models.T_Ptn{}, &models.T_Siswa{}, &models.T_Prodi{}, &models.T_Paket{}, &models.T_Daya_Tampung_Prodi{}, &models.Users{})

}
