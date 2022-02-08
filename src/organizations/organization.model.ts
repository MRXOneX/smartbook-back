import { Model, Table, Column, DataType } from "sequelize-typescript"



interface OrganizationCreationAttrs {
    name: string;
    typeOfActivity: string;
}


@Table({tableName: 'organizations'})
export class Organization extends Model<Organization, OrganizationCreationAttrs> {


    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    
    @Column({type: DataType.STRING, allowNull: false})
    name: string;


    @Column({type: DataType.STRING, allowNull: false})
    typeOfActivity: string;

    
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isConfirmed: boolean;

    
}