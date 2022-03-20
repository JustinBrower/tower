import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketsService } from '../services/TIcketsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
      .put('', this.updateAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getMyTickets(req.userInfo.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const updated = await accountService.updateAccount(req.userInfo, req.body)
      res.send(updated)
    } catch (error) {
      next(error)
    }
  }

}
