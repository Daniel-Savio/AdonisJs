import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   *Controller for creating a user
   */

  async create({ response, request, auth }: HttpContext) {
    await auth.authenticate()

    console.log(await request)

    const newUser = await request.only(['fullName', 'email', 'password', 'isAdmin'])
    try {
      const user = await User.create(newUser)
      return user.fullName, user.email
    } catch (err) {
      response.status(404).send('Invalid information')
    }
  }

  /**
   *Controller for listing users but with authentication
   */
  async getUsers({ response, auth }: HttpContext) {
    const user: User = await auth.authenticate()

    response.send({ user: user.fullName, userList: User.all() })
  }
}
