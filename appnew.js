// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient;
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017';
// Tên database và collection
const dbName = 'bookshop';

const data = {
    "Products":[
        {
            "id": 1,
            "name": "Bàn trà Rondoni" ,
            "price": 10900000,
            "categoryId": 1,
            "img": "bantrarondoni.jpg",
            "description": "Bàn trà đôi RONDONI là một sản phẩm nội thất vô cùng tiện ích và tinh tế."
        },
        {
            "id": 2,
            "name": "Bàn trà TRIPLE" ,
            "price": 7900000,
            "categoryId": 1,
            "img": "bantra2.jpg",
            "description": "Bàn trà TRIPLE là một sản phẩm nội thất vô cùng tiện ích và tinh tế."
        },
        {
            "id": 3,
            "name": "Bàn trà CLOUD" ,
            "price": 5490000,
            "categoryId": 1,
            "img": "bantra3.jpg",
            "description": "Bàn trà CLOUD với thiết kế uyển chuyển như đám mây, mang lại cảm giác thư giãn, đẹp mắt."
        },
        {
            "id": 4,
            "name": "BÀN TRÀ TWIN 2" ,
            "price": 5490000,
            "categoryId": 1,
            "img": "bantra4.jpg",
            "description": "Không quá nhiều chi tiết cầu kỳ, thay vào đó là sự chú trọng đến công năng và thiết kế tối giản hết mức có thể."
        },
        {
            "id": 5,
            "name": "Bàn trà Rocky" ,
            "price": 10500000,
            "categoryId": 1,
            "img": "bantra5.jpg",
            "description": "Được hoàn thiện từ các chất liệu cao cấp, có độ bền và tính thẩm mỹ cao như thép sơn tĩnh điện"
        },
        

        {
            "id": 6,
            "name": "SOFA BĂNG DUMPLINGS" ,
            "price": 10780000,
            "categoryId": 2,
            "img": "sofa1.jpg",
            "description": "Ghế sofa DUMPLINGS là kiểu ghế được thiết kế từ năm 1970 bởi kiến trúc sư người Ý Bellini."
        },
        {
            "id": 7,
            "name": "SOFA BAXTER M" ,
            "price": 12980000,
            "categoryId": 2,
            "img": "sofa2.jpg",
            "description": "Ghế sofa băng BAXTER M có kích thước lớn, đệm rộng rãi và được thiết kế để chứa nhiều người ngồi cùng lúc."
        },
        {
            "id": 8,
            "name": "Sofa góc PERSIAN" ,
            "price": 17760000,
            "categoryId": 2,
            "img": "sofa3.jpg",
            "description": "PERSIAN là một trong những siêu phẩm vừa gia nhập gia đình Sofa góc Ifurni"
        },
        {
            "id": 9,
            "name": "Sofa Pam" ,
            "price": 9900000,
            "categoryId": 2,
            "img": "sofa4.jpg",
            "description": "Thiết kế tối giản dành cho các gia chủ ưa thích sự nhẹ nhàng nhưng vẫn toát lên tính thẩm mỹ và gu cá tính riêng biệt. Cho không gian sống bớt chật chội và bí bách."
        },
        {
            "id": 10,
            "name": "Sofa Cookies" ,
            "price": 10680000,
            "categoryId": 2,
            "img": "sofa5.jpg",
            "description": "Thiết kế lạ mắt với nhiều kiểu dáng hiện đại và trẻ trung thích hợp cho các ngôi nhà diện tích từ nhỏ đến rộng rãi."
        },


        {
            "id": 11,
            "name": "BÀN ĂN BANISTER" ,
            "price": 12690000,
            "categoryId": 3,
            "img": "banan1.jpg",
            "description": "Bàn ăn BANISTER có chất liệu chính là chân Inox mạ vàng cao cấp và mặt đá Ceramic 11mm. Kích thước của bàn là 1m4-2m4x900x750mm1."
        },
        {
            "id": 12,
            "name": "Bàn Anantara" ,
            "price": 9560000,
            "categoryId": 3,
            "img": "banan2.jpg",
            "description": "Bàn Anantara là một sản phẩm sang trọng và đẳng cấp, với chân bàn được làm bằng inox 304 mạ vàng bóng loáng."
        },
        {
            "id": 13,
            "name": "Bàn ăn Skorpio" ,
            "price": 10550000,
            "categoryId": 3,
            "img": "banan3.jpg",
            "description": "Bàn ăn Skorpio là một sản phẩm hiện đại và độc đáo, với chân bàn được làm bằng thép sơn tĩnh điện, tạo nên sự mạnh mẽ và khác biệt."
        },
        {
            "id": 14,
            "name": "Bàn ăn PANNA" ,
            "price": 6500000,
            "categoryId": 3,
            "img": "banan4.jpg",
            "description": "Bàn ăn PANNA là một sản phẩm hiện đại và độc đáo, với chân bàn được làm bằng thép sơn tĩnh điện, tạo nên sự mạnh mẽ và khác biệt."
        },
        {
            "id": 15,
            "name": "Bàn ăn Bigold" ,
            "price": 13500000,
            "categoryId": 3,
            "img": "banan5.jpg",
            "description": "Bàn ăn Bigold là một sản phẩm nội thất cao cấp, sang trọng và hiện đại. Bàn ăn có chân bằng thép sơn tĩnh điện, có độ bền cao."
        },


        {
            "id": 16,
            "name": "KỆ KITO" ,
            "price": 2450000,
            "categoryId": 4,
            "img": "ke1.jpg",
            "description": "Kệ đa năng KITO chất liệu thép sơn tĩnh điện kết hợp gỗ MFC. Mẫu kệ giúp tiết kiệm không gian bếp, giúp bếp trở nên đẹp mắt và gọn gàng."
        },
        {
            "id": 17,
            "name": "Kệ Tivi Vision" ,
            "price": 7800000,
            "categoryId": 4,
            "img": "ke2.jpg",
            "description": "Theo xu hướng thiết kế nội thất hiện đại, kệ tivi được xem là vật dụng trang trí nội thất cho không gian phòng khách và phòng ngủ của mổi gia đình."
        },
        {
            "id": 18,
            "name": "Kệ TV Davidson" ,
            "price": 12650000,
            "categoryId": 4,
            "img": "ke3.jpg",
            "description": "Kệ TV Davidson là một sản phẩm độc đáo và ấn tượng của IFURNI. Kệ có khung thép rắn chắc, hộp gỗ màu đen huyền bí. Kệ có kiểu dáng hình chữ nhật lồng vào nhau, tạo nên một hiệu ứng hình học hấp dẫn."
        },
        {
            "id": 19,
            "name": "Kệ Tivi - IF 08" ,
            "price": 10560000,
            "categoryId": 4,
            "img": "ke4.jpg",
            "description": "Kệ Tivi - IF 08 ; chất liệu gỗ công nghiệp phủ veneer sơn PU màu trắng tinh khiết, bền đẹp, chắc chắn, dễ lau chùi , phù hợp cho phòng khách và phòng ngủ,... tạo cạm giác tươi mát và thoải mái cho không gian phòng của bạn"
        },
        {
            "id": 20,
            "name": "Kệ trang trí Smarty" ,
            "price": 1790000,
            "categoryId": 4,
            "img": "ke5.jpg",
            "description": "Kệ trang trí Smarty là một sản phẩm tinh tế và hiện đại của IFURNI. Kệ có khung thép rắn chắc, bền đẹp, và mặt thép chắc chắn chịu được sức nặng cao , dễ lau chùi."
        },


        {
            "id": 21,
            "name": "GHẾ THƯ GIÃN IMOLA" ,
            "price": 6300000,
            "categoryId": 5,
            "img": "ghetg1.jpg",
            "description": "SỰ LỰA CHỌN SANG TRỌNG – HIỆN ĐẠI CHO PHÒNG LÀM VIỆC, PHÒNG KHÁCH. Để bộ mặt ngôi nhà luôn sang trọng và thời thượng, chọn ngay những items mang nét đẹp tinh tế – hiện đại."
        },
        {
            "id": 22,
            "name": "Ghế Thư Giãn TOGO ROCKING" ,
            "price": 7540000,
            "categoryId": 5,
            "img": "ghetg2.jpg",
            "description": "TOGO SOFA ROCKING đang là một trong những sofa hot mẫu mới hot nhất trong năm 2024."
        },
        {
            "id": 23,
            "name": "GHẾ THƯ GIÃN RECLINER SILVER" ,
            "price": 6600000,
            "categoryId": 5,
            "img": "ghetg3.jpg",
            "description": "Mẫu ghế thư giãn Recliner Silver ra đời nhằm mang đến một sản phẩm đáp ứng đầy đủ nhu cầu của quý khách hàng, mẫu ghế không chỉ đẹp mắt, thoải mái để các thành viên trong gia đình có thể cùng sử dụng."
        },
        {
            "id": 24,
            "name": "GHẾ THƯ GIÃN CAPELLA" ,
            "price": 6900000,
            "categoryId": 5,
            "img": "ghetg4.jpg",
            "description": "Ghế thư giãn CAPELLA là một tác phẩm nghệ thuật kết hợp giữa thiết kế đẹp mắt và sự thoải mái tối đa, tạo nên không gian lý tưởng để nghỉ ngơi và thư giãn."
        },
        {
            "id": 25,
            "name": "GHẾ THƯ GIÃN ROXY ROCKING" ,
            "price": 5500000,
            "categoryId": 5,
            "img": "ghetg5.jpg",
            "description": "GHẾ THƯ GIÃN ROXY ROCKING là một chiếc ghế bập bênh theo phong cách giữa thế kỷ với một khuynh hướng hiện đại."
        }
    ],

    
    "categories":[
        {
         "id": 1,
         "name": "Bàn trà",
         "img": "nghe-thuat-toi-gian.webp"
        },
        {
         "id": 2,
         "name": "Bàn ăn",
         "img": "an-lac-tung-buoc-chan.jpeg"
        },
        {
         "id": 3,
         "name": "Ghế Sofa",
         "img": "an-lac-tung-buoc-chan.jpeg"
        },
        {
         "id": 4,
         "name": "Kệ",
         "img": "an-lac-tung-buoc-chan.jpeg"
        },
        {
         "id": 5,
          "name": "Ghế thư giản",
         "img": "an-lac-tung-buoc-chan.jpeg"
        }
        ],


    "user":[
        {
         "id": 2,
         "email": "teo@gmail.com",
         "password": "$2b$10$VHhXWoCubXIScZpyFekVdOdBqtLQVZaTbWcfU7SZ3o22NMWWicA7i",
         "fullname": "Nguyễn văn Tèo",
         "isAdmin": 1,
         "img": "teo.jpeg"
        },
        {
         "id": 3,
         "email": "admin@gmail.com",
         "password": "$2b$10$DX1V\/NUQLCKYyNua9JxE0uusxf8H2iTbwvGpERSbrUYdQIX97Ygbq",
         "fullname": "admin",
         "isAdmin": 0,
         "img": "admin.jpeg"
        }
    ]
}

async function main() {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    await insertData(db, 'products', data.Products);
    await insertData(db, 'categories', data.categories);
    await insertData(db, 'users', data.user);

    client.close();
}

async function insertData(db, collectionName, data) {
    await db.createCollection(collectionName);
    await db.collection(collectionName).insertMany(data);
}

main().catch(console.error);