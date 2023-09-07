import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn({ type: 'varchar', length: 60, nullable: false })
  orderNo!: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  trackingNumber!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  courier: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  street: string;

  @Column()
  zeepCode: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  destinationCountryIso3: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  articleNo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  articleImageUrl: string;

  @Column()
  quantity: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  productName: string;
}
