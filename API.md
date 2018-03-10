**TODO**
----

* **URL**

  1)/
  2)/todo/:id

* **Method:**

  1)`GET` | `POST`
  2)`GET`| `DELETE`

*  **URL Params**

   **Required:**

   `id` example "5aa14a447042900014d92cd9"

* **Data Params**

      title: String,
          content: String,
          status: String

* **Success Response:**

  GET, PUT, POST

    **Content:** `{
                      "_id": "5aa14a447042900014d92cd9",
                      "text": "Active Item",
                      "url": "radiant-basin-31635.herokuapp.com",
                      "status": "active",
                      "__v": 0
                  }`

   DELETE
   * **Code:** 200 <br />
       **Content:**
                    "Todo deleted"


