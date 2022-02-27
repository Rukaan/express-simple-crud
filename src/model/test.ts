import { PrimaryKey, Table, Column, Model } from "sequelize-typescript";

@Table({tableName: "test"})
export default class Test extends Model<Test> {
	@Column
	name: string;
}
