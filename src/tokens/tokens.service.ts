import { Injectable } from "@nestjs/common";
//
import { InjectModel } from "@nestjs/sequelize";
//
import { JwtService } from "@nestjs/jwt";
// model
import { Token } from './tokens.model'




@Injectable()
export class TokensService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token, 
                                    private jwtService: JwtService) {}


    async generateTokens(userId: number, email: string) {
      
      const jwtPayload = {
          userId: userId,
          email: email,
      };
                                      
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: 'AT_SECRET',
          expiresIn: '15m',
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: 'RT_SECRET',
          expiresIn: '7d',
        }),
      ]);
                                      
      return {
        access_token: at,
        refresh_token: rt,
      };
    }
}