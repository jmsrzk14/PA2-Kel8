package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Payment struct {
	Id        string    `json:"id"`
	IdPaket   uint      `json:"id_paket" gorm:"not null"`
	T_Paket   T_Paket   `json:"t_paket" gorm:"foreignKey:IdPaket"`
	Harga     int    `json:"harga" gorm:"not null"`
	IdSiswa   uint      `json:"id_siswa" gorm:"not null"`
	T_Siswa   T_Siswa   `json:"t_siswa" gorm:"foreignKey:IdSiswa"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}

func (payment *Payment) ValidatePayment() error {
	validate := validator.New()
	return validate.Struct(payment)
}
