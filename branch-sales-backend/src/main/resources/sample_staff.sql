-- Seed Sample Staff
INSERT INTO staff (name, email, phone_number, password, active, branch_id) VALUES 
('Admin Colombo', 'admin@bananaleaf.com', '0771234567', '$2a$10$8.UnVuG9HHgffUDAlk8qnO656uB7cHAYIlMC3H7ub9fZ7B9yYJjN2', 1, 1),
('Kandy Manager', 'kandy@bananaleaf.com', '0772233445', '$2a$10$8.UnVuG9HHgffUDAlk8qnO656uB7cHAYIlMC3H7ub9fZ7B9yYJjN2', 1, 2),
('Galle Sales', 'galle@bananaleaf.com', '0773344556', '$2a$10$8.UnVuG9HHgffUDAlk8qnO656uB7cHAYIlMC3H7ub9fZ7B9yYJjN2', 1, 3),
('Inactive Jaffna', 'jaffna@bananaleaf.com', '0774455667', '$2a$10$8.UnVuG9HHgffUDAlk8qnO656uB7cHAYIlMC3H7ub9fZ7B9yYJjN2', 0, 4);

-- Seed Staff Permissions
-- Colombo Admin (ID 1 if starting fresh, but let's use the likely IDs)
-- Since we don't know the exact auto-increment IDs, we'll use subqueries or just assume 1,2,3,4 if the table was clean.
-- Safer way:
SET @colombo_id = (SELECT id FROM staff WHERE email = 'admin@bananaleaf.com');
SET @kandy_id = (SELECT id FROM staff WHERE email = 'kandy@bananaleaf.com');
SET @galle_id = (SELECT id FROM staff WHERE email = 'galle@bananaleaf.com');
SET @jaffna_id = (SELECT id FROM staff WHERE email = 'jaffna@bananaleaf.com');

INSERT INTO staff_permissions (staff_id, permission) VALUES 
(@colombo_id, 'SYNC_PRODUCTS'),
(@colombo_id, 'MAKE_SALE'),
(@colombo_id, 'UPDATE_SALE_STATUS'),
(@kandy_id, 'SYNC_PRODUCTS'),
(@kandy_id, 'MAKE_SALE'),
(@galle_id, 'MAKE_SALE'),
(@jaffna_id, 'SYNC_PRODUCTS');
