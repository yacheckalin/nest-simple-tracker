import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Checkpoint } from './checkpoint.entity';

@Entity({ name: 'orders' })
@Unique('k_unique_constraint', [
  'orderNumber',
  'trackingNumber',
  'articleNumber',
])
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  orderNumber!: string;

  @OneToMany(() => Checkpoint, (checkpoint) => checkpoint.trackingNumber)
  checkpoints: Checkpoint[];

  @Column({ type: 'varchar', length: 30, nullable: true })
  trackingNumber: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  courier: string | null;

  @Column({ type: 'varchar', length: 20, nullable: false })
  street!: string;

  @Column()
  zipCode: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  city!: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  destinationCountryIso3!: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email!: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  articleNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  articleImageUrl: string | null;

  @Column({ nullable: true })
  quantity: number;

  @Column({ type: 'varchar', length: 60, nullable: true })
  productName: string;

  public toEntity(item: any = null) {
    const it = new Order();
    it.id = this.id;
    it.orderNumber = item?.orderNo;
    it.trackingNumber = item?.tracking_number;
    it.courier = item?.courier;
    it.street = item?.street;
    it.zipCode = item?.zip_code;
    it.city = item?.city;
    it.destinationCountryIso3 = item?.destination_country_iso3;
    it.email = item?.email;
    it.articleNumber = item?.articleNo || null;
    it.articleImageUrl = item?.articleImageUrl || null;
    it.quantity = item.quantity || null;
    it.productName = item?.product_name || null;

    return it;
  }
}
