import { Model, Table, Column, DataType } from "sequelize-typescript";


interface UserCreationAttrs {
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    password: string;
    dateOfBirth: string;
    gender: string;
}


@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;

    @Column({type: DataType.STRING, allowNull: false})
    middlename: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    dateOfBirth: string;

    @Column({type: DataType.STRING, allowNull: false})
    gender: string;

    @Column({type: DataType.STRING(1000), allowNull: true})
    hashRt: string
}