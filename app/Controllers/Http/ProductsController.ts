// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductsController {
  public async index() {
    return Database.from('products.products').select('*')
  }

  public async show({ request }) {
    const { id } = request.params()
    const [product] = await Database.from('products.products')
      .select('*')
      .where('id', id)
      .catch(() => {
        throw new Exception('Invalid ID', 400)
      })
    if (!product) throw new Exception('Not Found', 404)
    return product
  }
}
