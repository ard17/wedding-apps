--tabel wedding category
CREATE TABLE wedding_category(
	weca_id SERIAL,
	weca_name VARCHAR(35),
	CONSTRAINT weca_id_pk PRIMARY KEY (weca_id)
);

--tabel wedding vendor
CREATE TABLE wedding_vendor(
	weve_id SERIAL,
	weve_name VARCHAR(150) UNIQUE,
	weve_rating INTEGER,
	weve_type VARCHAR(35),
	weve_province VARCHAR(55),
	weve_city VARCHAR(55),
	weve_address VARCHAR(255),
	weve_start_price NUMERIC(15,2),
	weve_weca_id INTEGER,
	CONSTRAINT weve_id_pk PRIMARY KEY (weve_id),
	CONSTRAINT weve_weca_id_fk FOREIGN KEY (weve_weca_id) REFERENCES wedding_category(weca_id)ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel wedding gallery
CREATE TABLE wedding_gallery(
	wega_id SERIAL,
	wega_url_name VARCHAR(255),
	wega_filesize INTEGER,
	wega_filetype VARCHAR(15),
	wega_weve_id INTEGER,
	CONSTRAINT wega_id_pk PRIMARY KEY (wega_id),
	CONSTRAINT wega_weve_id_fk FOREIGN KEY (wega_weve_id) REFERENCES wedding_vendor(weve_id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel users
CREATE TABLE users(
	user_id SERIAL,
	user_name VARCHAR(20) NOT NULL,
	user_email VARCHAR(55) UNIQUE NOT NULL,
	user_password VARCHAR(100) NOT NULL,
	user_handphone VARCHAR(15) NOT NULL,
	user_roles VARCHAR(15),
	CONSTRAINT user_id_pk PRIMARY KEY (user_id)
);

--tabel address
CREATE TABLE address(
	addr_id SERIAL,
	addr_name VARCHAR(255),
	addr_detail VARCHAR(55),
	addr_latitude VARCHAR(200),
	addr_longitude VARCHAR(200),
	addr_user_id INTEGER,
	CONSTRAINT addr_id_pk PRIMARY KEY (addr_id),
	CONSTRAINT addr_user_id_fk FOREIGN KEY (addr_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel wedding_package
CREATE TABLE wedding_package(
	wepa_id SERIAL,
	wepa_name VARCHAR(150),
	wepa_price NUMERIC(15,2),
	wepa_capacity VARCHAR(30),
	wepa_type VARCHAR(15),
	wepa_weve_id INTEGER,
	CONSTRAINT wepa_id_pk PRIMARY KEY (wepa_id),
	CONSTRAINT wepa_weve_id_fk FOREIGN KEY (wepa_weve_id) REFERENCES wedding_vendor(weve_id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel wedding_reserve
CREATE TABLE wedding_reserve(
	were_id SERIAL,
	were_created DATE,
	were_status VARCHAR(15),
	were_user_id INTEGER,
	CONSTRAINT were_id_pk PRIMARY KEY (were_id),
	CONSTRAINT were_user_id_fk FOREIGN KEY (were_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel orders
CREATE SEQUENCE order_name_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1;

create or replace function order_name () returns VARCHAR as $$  
SELECT CONCAT('ORD',to_char(now(),'YYYYMMDD'),'#',lpad(''||nextval('order_name_seq'),3,'0'));
$$ language sql;

CREATE TABLE orders(
	order_name VARCHAR(15) DEFAULT order_name(),
	order_created DATE,
	order_subtotal NUMERIC(15,2),
	order_tax NUMERIC(15,2),
	order_discount NUMERIC(15,2),
	order_promo NUMERIC(15,2),
	order_total_price NUMERIC(15,2),
	order_status VARCHAR(15),
	order_payment_type VARCHAR(15),
	order_payment_trx VARCHAR(15),
	order_user_id INTEGER,
	CONSTRAINT order_name_pk PRIMARY KEY (order_name),
	CONSTRAINT order_user_id_fk FOREIGN KEY (order_user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

--tabel wedding_reserve_lines
CREATE TABLE wedding_reserve_lines(
	writ_id SERIAL,
	writ_start_date DATE,
	writ_end_date DATE,
	writ_total_day INTEGER,
	writ_qty INTEGER,
	writ_price NUMERIC(15,2),
	writ_subtotal NUMERIC(15,2),
	writ_weve_id INTEGER,
	writ_wepa_id INTEGER,
	writ_order_name VARCHAR(15),
	CONSTRAINT writ_id_pk PRIMARY KEY (writ_id),
	CONSTRAINT writ_weve_id_fk FOREIGN KEY (writ_weve_id) REFERENCES wedding_vendor(weve_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT writ_wepa_id_fk FOREIGN KEY (writ_wepa_id) REFERENCES wedding_package(wepa_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT writ_order_name_fk FOREIGN KEY (writ_order_name) REFERENCES orders(order_name) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE SEQUENCE acc_number_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1;

create or replace function acc_number () returns VARCHAR as $$  
SELECT CONCAT('ACP-ID-',lpad(''||nextval('acc_number_seq'),4,'0'));
$$ language sql;

CREATE TABLE account_payment(
	acc_number VARCHAR(15) DEFAULT acc_number(),
	acc_saldo NUMERIC(18,2),
	acc_pin_number VARCHAR(6),
	acc_total_point INTEGER,
	acc_user_id INTEGER,
	CONSTRAINT acc_number_pk PRIMARY KEY (acc_number),
	CONSTRAINT acc_user_id_fk FOREIGN KEY (acc_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE bank(
	bank_id VARCHAR(3) UNIQUE,
	bank_name VARCHAR(25) UNIQUE,
	CONSTRAINT bank_id_pk PRIMARY KEY(bank_id)
);

CREATE TABLE bank_account(
	baac_acc_bank VARCHAR(25),
	baac_owner VARCHAR(85) NOT NULL,
	baac_saldo NUMERIC(18,2),
	baac_pin_number VARCHAR(6),
	baac_start_date DATE,
	baac_end_date DATE,
	baac_type VARCHAR(20) NOT NULL,
	baac_user_id INTEGER,
	baac_bank_id VARCHAR(3),
	CONSTRAINT baac_user_id_fk FOREIGN KEY (baac_user_id) REFERENCES users (user_id),
	CONSTRAINT baac_bank_id_fk FOREIGN KEY (baac_bank_id) REFERENCES bank (bank_id),
	CONSTRAINT baac_acc_bank_pk PRIMARY KEY(baac_acc_bank)
);

CREATE SEQUENCE payt_trx_number_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1;
  
create or replace function payt_trx_number () returns VARCHAR as $$
select CONCAT('P',to_char(now(),'YYYYMMDD'),'#',lpad(''||nextval('payt_trx_number_seq'),5,'0'));
$$ language sql;

CREATE TABLE payment_transaction(
	payt_id SERIAL,
	payt_trx_number VARCHAR(15) DEFAULT payt_trx_number(),
	payt_order_number VARCHAR(150),
	payt_baac_acc_bank VARCHAR(25),
	payt_trx_number_ref VARCHAR(25),
	payt_date DATE,
	payt_debet NUMERIC(18,2),
	payt_credit NUMERIC(18,2),
	payt_desc VARCHAR(255),
	payt_type VARCHAR(20),
	payt_promo_point INTEGER,
	payt_acc_number VARCHAR(15),
	CONSTRAINT payt_baac_acc_bank_fk FOREIGN KEY (payt_baac_acc_bank) REFERENCES bank_account (baac_acc_bank),
	CONSTRAINT payt_acc_number_fk FOREIGN KEY (payt_acc_number) REFERENCES account_payment (acc_number),
	CONSTRAINT payt_id_pk PRIMARY KEY(payt_id)
);