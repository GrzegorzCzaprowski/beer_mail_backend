package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/GrzegorzCzaprowski/beer_mail/backend/authorization"
	"github.com/julienschmidt/httprouter"
)

func (h UserHandler) Get(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	ok, err := authorization.AdminTokenAuthentication(w, req)
	if err != nil {
		log.Println("authentication failed: ", err)
		return
	}
	if !ok {
		log.Println("you are not an admin")
		return
	}

	users, err := h.M.GetAllUsersFromDB()
	if err != nil {
		log.Println("error with decoding user from json: ", err)
		w.WriteHeader(500)
		return
	}

	err = json.NewEncoder(w).Encode(users)
	if err != nil {
		log.Println("error with encoding to json: ", err)
		w.WriteHeader(500)
		return
	}
	log.Println("got all users")
}
