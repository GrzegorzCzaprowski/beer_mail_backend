package models

import (
	"database/sql"

	"github.com/lib/pq"
)

type Event struct {
	ID        int    `json:"id,omitempty"`
	Name      string `json:"name,omitempty"`
	IDcreator int    `json:"idcreator,omitempty"`
	//	Users []User `json:"users,omitempty"`
	Date  string `json:"date,omitempty"`
	Place string `json:"place,omitempty"`
}

type EventModel struct {
	DB *sql.DB
}

func (model EventModel) InsertEventIntoDB(event Event) error {
	_, err := model.DB.Exec("INSERT INTO events(name, id_users, date, place) VALUES($1, $2, $3, $4)", event.Name, event.IDcreator, event.Date, event.Place)
	if err, ok := err.(*pq.Error); ok {
		if err.Code == "23505" {
			return err
		}
	}

	if err != nil {
		return err
	}

	return err
}
