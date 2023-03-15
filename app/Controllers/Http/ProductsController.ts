// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductsController {
  public async index() {
    return Database.from('products.products').select('*')
  }
}
