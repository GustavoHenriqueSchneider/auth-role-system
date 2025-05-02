import { asClass } from 'awilix'

// import UserRepository from './repositories/userRepository.js'
import JwtService from './services/jwtService.js'
import RedisService from './services/redisService.js'

export default container => {
  container.register({
    // userRepository: asClass(UserRepository).singleton(),
    jwtService: asClass(JwtService).singleton(),
    redisService: asClass(RedisService).singleton()
  })
}