package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Kelulusan struct {
	Username   string    `json:"username" validate:"required" gorm:"not null"`
	Kode_Jalur string    `json:"kode_jalur" gorm:"type:enum('SBMPTN', 'SNMPTN');not null" validate:"required,oneof=SBMPTN SNMPTN"`
	Id_Prodi   int       `json:"id_prodi" gorm:"not null"`
	Active     int       `json:"active" gorm:"not null"`
	CreatedAt  time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt  time.Time `gorm:"autoUpdateTime" json:"updated_at"`
	Jenjang    string    `json:"jenjang" gorm:"type:enum('S1', 'D4', 'D3');not null" validate:"required,oneof=S1 D4 D3"`
}

func (kelulusan *Kelulusan) ValidateKelulusan() error {
	validate := validator.New()
	return validate.Struct(kelulusan)
}
