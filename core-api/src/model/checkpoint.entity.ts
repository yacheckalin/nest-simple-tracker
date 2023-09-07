import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'checkpoints' })
export class Checkpoint {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  trackingNumber: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  location: string;

  @Column()
  timestamp: Date;

  @Column({ type: 'varchar', length: 30, nullable: false })
  status: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  statusText: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  statusDetail: string;
}
