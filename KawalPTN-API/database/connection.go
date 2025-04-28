package database

import (
	"KawalPTN-API/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "root:@tcp(localhost:3306)/pa02kel08?charset=utf8mb4&parseTime=True&loc=Local"
	conn, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("could not connect to database")
	}

	DB = conn

	conn.AutoMigrate(
		&models.Payment{})

}
