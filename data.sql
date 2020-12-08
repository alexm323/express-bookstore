CREATE TABLE books
(
  isbn TEXT PRIMARY KEY,
  amazon_url TEXT,
  author TEXT,
  language TEXT,
  pages INTEGER,
  publisher TEXT,
  title TEXT,
  year INTEGER
);

-- INSERT INTO books
-- VALUES('9780439203524', 'https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Illustrated', 'JK Rowling', 'English', 200, 'Penguin', 'Harry Potter and the Sorcerers Stone', 2000);
-- INSERT INTO books
-- VALUES('12345', 'https://www.amazon.com/the_color_of_magic', 'Sir Pratchett', 'English', 300, 'Random House', 'The Color of Magic', 2008);
-- INSERT INTO books
-- VALUES('54321', 'https://www.amazon.com/lord_of_the_rings', 'JRR Tolkien', 'English', 1000, 'Tolkien House', 'The Lord of the Rings', 1996);

