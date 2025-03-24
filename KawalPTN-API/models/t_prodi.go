package models

import (
	"github.com/go-playground/validator/v10"
)

type T_Prodi struct {
	Id_prodi        uint      	`json:"id_prodi"`
	Nama_prodi 		string    	`json:"nama_prodi" gorm:"not null"`
	Id_ptn     		int       	`json:"id_ptn" gorm:"not null"`
	T_Ptn    		T_Ptn  		`gorm:"foreignKey:Id_ptn" json:"t_ptn"`
	Nama_prodi_ptn	string     	`json:"nama_prodi_ptn" gorm:"not null"`
	Jenis      		string      `json:"jenis" gorm:"not null"`
	Active			int			`json:"active" gorm:"not null"`
	Jenjang 		string 		`json:"jenjang" gorm:"not null"`
}

func (t_prodi *T_Prodi) ValidateTProdi() error {
	validate := validator.New()
	return validate.Struct(t_prodi)
}
