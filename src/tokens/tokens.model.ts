import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript"
// model
import { User } from "src/users/users.model";


interface TokenCreationAttrs {
    refreshToken: string;
    userId: number;
}



@Table({tableName: "tokens"})
export class Token extends Model<Token, TokenCreationAttrs> {

    @Column({type: DataType.STRING, allowNull: false})
    refreshToken: string;


    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    

}