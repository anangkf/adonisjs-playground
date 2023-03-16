// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuid } from 'uuid'

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

  public async store({ request }) {
    const body = request.body()
    const id = uuid()
    if (!body.name || !body.price) {
      throw new Exception('Bad Request', 400)
    }

    return Database.table('products.products')
      .insert({ id, ...body })
      .returning(['id', 'name', 'price', 'created_at'])
  }
}
