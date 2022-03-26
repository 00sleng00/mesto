export class Api {
   constructor({ baseUrl, headers }) {
      this._headers = headers
      this._baseUrl = baseUrl
      // тело конструктора
   }

   _checkRequest(res) {
      if (res.ok) {
         return res.json()
      }
      else {
         return Promise.reject(res.statusText)
      }
   }

   getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: this._headers
      })
         .then(this._checkRequest)
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers
      })
         .then(this._checkRequest)
   }


   editProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify({
            name,
            about
         })
      })
         .then(this._checkRequest)
   }

   editAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: "PATCH",
         headers: this._headers,
         body: JSON.stringify(avatar)
      })
         .then(this._checkRequest)

   }

   addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            name,
            link
         })
      })
         .then(this._checkRequest)
   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
         method: "DELETE",
         headers: this._headers
      })
         .then(this._checkRequest)

   }

   deleteLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "DELETE",
         headers: this._headers
      })
         .then(this._checkRequest)

   }

   addLike(id) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
         method: "PUT",
         headers: this._headers
      })
         .then(this._checkRequest)

   }
}


