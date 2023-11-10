const fs = require("fs");

class ProductManager {
  constructor(path) {
    // "./listaProductos.json"
    this.path = path; // "./listaProductos.json"
    try {
      let productos = fs.readFileSync(this.path, "utf-8"); // -> lee el archivo "./listaProductos.json"
      this.productos = JSON.parse(productos);
    } catch {
      this.productos = [];
    }
  }
  ///// metodo que guarda los productos en un archivo json
  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path, // "./listaProductos.json"
        JSON.stringify(this.productos, null, "\t"),
        "utf-8"
      );
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  getProducts() {
    console.log(this.productos);
  }

  getProductById(id) {
    const productSelected = this.productos.find((p) => p.id == id);

    productSelected
      ? console.log(productSelected)
      : console.log("Producto no existente");
  }

  async addProducts(producto) {
    if (!producto) {
      return console.log("El producto no existe");
    }

    const existsProd = this.productos.find((p) => p.id === producto.id);

    if (existsProd) {
      return console.log("El producto ya existe");
    }

    this.productos.push(producto);

    await this.saveFile(); // -> Llama a la linea 15
  }

  async updateProduct(id, updates) {
   // sirve para buscar un producto por id
    const productIndex = this.productos.findIndex((p) => p.id === id);
  
    if (productIndex !== -1) {
      // si el producto existe, lo actualiza
      this.productos[productIndex] = Object.assign({}, this.productos[productIndex], updates);
      await this.saveFile();
      console.log("Producto actualizado exitosamente");
    } else {
      console.log("No se encuentra el producto");
    }
    await this.saveFile();
  }
  

  
  async deleteProduct(id) {
    // sirve para buscar un producto por id
    const productIndex = this.productos.findIndex((p) => p.id === id);
  
    if (productIndex !== -1) {
      // si el producto existe, lo elimina
      this.productos.splice(productIndex, 1);
      console.log("Producto eliminado exitosamente");
    } else {
      console.log("No se encuentra el producto");
    }
  
    
    await this.saveFile();
  }
  
}

////////////////////////////////////
class Product {
  constructor(id, title, description, price, img, code, stock) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.price = price),
      (this.img = img),
      (this.code = code),
      (this.stock = stock);
  }
}


////testing 

async function fetchDatos() {
  const amazonStore = new ProductManager("./listaProductos.json");

  await amazonStore.addProducts(
    new Product(1, "Celular", "Comun", 250, "no img", "7869", 25)
  );
  await amazonStore.addProducts(
    new Product(2, "Calculadora", "Pro", 50, "no img", "3547", 27)
  );
  

 


  // USO AWAIT
  // DENTRO DE UNA FUNCION ASYNC SIEMPRE!
  // Cuando la función a llamar es asincrona y con promesas

  amazonStore.getProducts();
  await amazonStore.addProducts(
    new Product(7,"Camioneta", "Pro", 50, "no img", "1572", 30)
  );

  // llama al metodo updateProduct mandando el id y que atributo a actualizar
  await amazonStore.updateProduct(7, { title: "Moto" });


  // llama al metodo deleteProduct mandando el id como parametro
  //await amazonStore.deleteProduct(7);

   }

fetchDatos();
