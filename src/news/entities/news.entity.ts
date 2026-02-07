import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar' })
  date: string;

  @Column({ type: 'varchar', nullable: true })
  img: string | null;

  @Column('jsonb', { nullable: true, default: () => "'[]'::jsonb" })
  image: string[];

  @Column({ type: 'text', nullable: true })
  fullContent: string | null;

  @Column({ type: 'varchar', nullable: true })
  video: string | null;
}
