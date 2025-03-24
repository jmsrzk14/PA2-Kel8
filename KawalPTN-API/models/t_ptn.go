package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type T_Ptn struct {
	Id_ptn         	uint      	`json:"id_ptn"`
	Nama_ptn 		string    	`json:"nama_ptn" gorm:"not null"`
	Nama_singkat	string      `json:"nama_singkat" gorm:"not null"`
	Alamat_web 		string      `json:"alamat_web" gorm:"not null"`
	CreatedAt       *time.Time 	`gorm:"autoCreateTime;default:null" json:"created_at"`
	CreatedBy       *int       	`json:"created_by" gorm:"default:null"`
	UpdatedAt       *time.Time 	`gorm:"autoUpdateTime;default:null" json:"updated_at"`
	UpdatedBy       *int       	`json:"updated_by" gorm:"default:null"`
	Active      	*int       	`json:"active" gorm:"default: null"`
}

func (t_prn *T_Ptn) ValidateTPtn() error {
	validate := validator.New()
	return validate.Struct(t_prn)
}
