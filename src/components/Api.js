class Api {
   constructor({ baseUrl, headers }) {
      this._headers = headers
      this._baseUrl = baseUrl
      // тело конструктора
   }

   getProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: this._headers
      })
         .then(res => res.ok ? res.json() : Promise.reject(res.status))
         .catch(console.log)
   }

   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: this._headers
      })
         .then(res => res.ok ? res.json() : Promise.reject(res.status))
         .catch(console.log)
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
         .then(res => res.ok ? res.json() : Promise.reject(res.status))
         .catch(console.log)
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
         .then(res => res.ok ? res.json() : Promise.reject(res.status))
         .catch(console.log)
   }
}

export const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
   headers: {
      authorization: '21f71f02-2b30-453e-b34c-930853c71700',
      'Content-Type': 'application/json'
   }
});