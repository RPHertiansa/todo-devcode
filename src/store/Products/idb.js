// function createDB () {
//   let db = null
//   const dbName = document.getElementById('txtDB').value
//   const dbVersion = document.getElementById('txtVersion').value

//   const request = indexedDB.open(dbName, dbVersion)

//   request.onupgradeneeded = e => {
//     db = e.target.result
//     const store = db.createObjectStore('product', { keyPath: 'id' })
//     store.transaction.oncomplete = e => {
//       console.log('store created')
//     }
//     console.log('upgrade is called')
//   }

//   request.onsuccess = e => {
//     function insertItem (products) {
//       if (db) {
//         const insert = db.transaction('product', 'readwrite')
//         const store = insert.objectStore('product')

//         insert.onerror = e => {
//           console.log('error')
//         }

//         store.transaction.oncomplete = e => {
//           console.log('success')
//         }

//         products.forEach(product => {
//           const request = store.add(product)

//           request.onerror = e => {
//             console.log('insert error')
//           }

//           request.onsuccess = e => {
//             console.log('insert success')
//           }
//         })
//       }
//     }
//     insertItem(productData)
//     console.log('success')
//   }

//   request.onerror = e => {
//     console.log('error')
//   }
// }
