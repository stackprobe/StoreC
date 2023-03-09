using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;
using System.IO;

namespace Charlotte.Tests
{
	public class Test0001
	{
		// 顧客情報
		public class CustomerInfo
		{
			public int CustomerId;       // 顧客ID
			public string FirstName;     // 姓
			public string LastName;      // 名
			public string Email;         // メールアドレス
			public string PhoneNumber;   // 電話番号
			public string Address;       // 住所
			//public string City;          // 市区町村
			//public string State;         // 都道府県
			//public string Country;       // 国名
			public string PostalCode;    // 郵便番号

			// ----

			public long Value01;
			public long Value02;
			public long Value03;
			public long Value04;
			public long Value05;
			public long Value06;
			public long Value07;
			public long Value08;
			public long Value09;
			public long Value10;
		}

		private List<CustomerInfo> Customers = new List<CustomerInfo>();

		private void CreateCustomers()
		{
			const int RECORD_COUNT = 1000000;

			string[] FIRST_NAMES =
				new string[] { "陽菜", "蓮", "蒼空", "結菜", "颯太", "優花", "樹", "心愛", "悠真", "美羽", "太一", "美咲", "大翔", "彩花", "翔太", "千尋", "悠希", "琉花", "大和", "莉子", "翼", "桃子", "颯", "理央", "優希", "悠斗", "瑠菜", "慎太郎", "陽翔", "夏希", "瑞希", "大輝", "萌", "颯人", "愛菜", "智也", "綾音", "遥斗", "彩乃", "健太", "舞", "悠里", "拓海", "朱音", "龍太郎", "杏", "匠", "亜希", "圭太", "由菜", "悠", "海斗", "和馬", "愛梨", "拓真", "沙耶香", "優", "瑛太", "樹里", "翔", "莉緒", "尚輝", "葵", "亮太", "桜子", "雄大", "美和", "隆太", "柚希", "隼人", "恵", "拓也", "美優", "祐介", "奈緒美", "健", "希望", "翔平", "菜々子", "晃平", "未来", "琴音", "直樹", "真琴", "直人", "彩香", "亜衣", "智之", "菜月", "祐輔", "朋美", "瑠璃", "浩太朗", "柚葉", "健司", "由紀", "孝太郎", "慎之介", "鈴音", "祐樹", "愛梨沙", "隆司", "彩花", "俊介", "優奈", "裕斗", "咲良", "健吾", "由佳", "秀和", "菜穂子", "幸平", "心", "祥太", "楓", "大河", "香菜", "慶太", "未来絵", "彰", "楓香", "慶太郎", "彩", "敬太" };
			string[] LAST_NAMES =
				new string[] { "佐藤", "鈴木", "高橋", "田中", "渡辺", "伊藤", "山本", "中村", "小林", "加藤", "吉田", "山田", "佐々木", "山口", "松本", "井上", "木村", "林", "清水", "山崎", "阿部", "森", "池田", "橋本", "山下", "石川", "中島", "前田", "藤田", "小川", "後藤", "岡田", "長谷川", "村上", "近藤", "石井", "斎藤", "坂本", "遠藤", "青木", "藤原", "西村", "福田", "太田", "三浦", "藤井", "岡本", "松田", "中川", "中嶋", "原田", "小野", "田村", "竹内", "金子", "和田", "中山", "熊谷", "野口", "新井", "菅原", "大塚", "平野", "河野", "堀", "杉山", "服部", "岩崎", "安藤", "内田", "黒田", "川口", "高田", "関口", "古川", "島田", "市川", "白石", "小島", "秋山", "大橋", "荒木", "大久保", "田口", "宮崎", "北村", "木下", "村田", "吉川", "広瀬", "永井", "香川", "浜田", "石田", "前川", "坂口", "福崎", "松井", "森山", "菊地", "浅野", "古田", "小泉", "水野", "野村", "中田", "大西", "平岡", "金井", "青山", "嶋田", "菊池", "永田", "荒井", "小嶋", "戸田", "藤川", "井口", "白井", "関根", "鶴田", "福井", "酒井", "高野", "石崎", "大島", "沢田", "上野", "小柳" };
			string[] EMAIL_ACCOUNTS =
				new string[] { "johndoe", "janedoe", "mikesmith", "sarahlee", "davidbrown", "lisawang", "chrisjones", "amandabaker", "stevenkim", "laurabrown" };
			string[] EMAIL_DOMAINS =
				new string[] { "gmail.com", "yahoo.co.jp", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "protonmail.com", "gmx.com", "zoho.com", "mail.com" };

			this.Customers = new List<CustomerInfo>(RECORD_COUNT);

			for (int count = 0; count < RECORD_COUNT; count++)
			{
				CustomerInfo customer = new CustomerInfo()
				{
					CustomerId = count + 1000000,
					FirstName = SCommon.CRandom.ChooseOne(FIRST_NAMES),
					LastName = SCommon.CRandom.ChooseOne(LAST_NAMES),
					Email = SCommon.CRandom.ChooseOne(EMAIL_ACCOUNTS) + "@" + SCommon.CRandom.ChooseOne(EMAIL_DOMAINS),
					PhoneNumber = SCommon.CRandom.GetRange(100, 999) + "-" + SCommon.CRandom.GetRange(1000, 9999) + "-" + SCommon.CRandom.GetRange(1000, 9999),
					Address = MakeAddress(),
					PostalCode = SCommon.CRandom.GetRange(100, 999) + "-" + SCommon.CRandom.GetRange(1000, 9999),

					// ----

					Value01 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value02 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value03 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value04 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value05 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value06 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value07 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value08 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value09 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
					Value10 = SCommon.CRandom.GetLong(SCommon.IMAX_64),
				};

				this.Customers.Add(customer);
			}
		}

		private string MakeAddress()
		{
			string[] PREFECTURES =
				new string[] { "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県" };
			string[] CITY_TOWN_NAMES =
				new string[] { "あさぎり", "いぶすき", "うぐいす島", "えんぴつ", "おおまち", "かもめ", "きりしま", "くろいし", "こまつ", "さくら", "しょうじょう", "たいよう", "つばさ", "てるおか", "ながねん", "にしい", "はなづき", "ひよどり", "ふうじょう", "ほしの", "まつおか", "めじろ台", "もみじが丘", "やまどり", "わかば", "旭丘", "金銀", "銀河", "紅葉谷", "桜ヶ丘", "紫苑", "紫陽花", "朱雀", "松風", "神代", "翠", "青海", "静岡山", "朝霧", "天空", "天竺", "桃源郷", "鳳凰", "夕焼け", "麒麟" };
			string[] HI_APARTMENT_NAMES =
				new string[] { "クリスタルタワー", "ロイヤルパレス", "グランドビュー", "シービューレジデンス", "メタロポリス", "シルバーコート", "ゴールデンハーバー", "パークサイドレジデンス", "フォレストヒルズ", "ハイランドパーク", "ブルームーブ", "ロックウェイレジデンス", "ダイアモンドハイツ", "プラチナヒルズ", "エンシェントキャッスル", "シティービューレジデンス", "サンセットプラザ", "マウンテンビューアパートメント", "ハーモニーガーデン", "プレミアムタワー" };
			string[] LW_APARTMENT_NAMES =
				new string[] { "サンライフ", "グリーンハイツ", "メゾン・ド・フルール", "サンハイツ", "パレス・コート", "シャトレー宝町", "ファミリア新宿", "サニーコート", "ローズガーデン", "マンションハイツ", "メリーゴーランド", "クラシックコート", "リバーサイドハウス", "オリエンタルハイツ", "パークハウス", "ハーモニーレジデンス", "サンセットハイツ", "オリンピアハイツ", "ニュータワー", "シャーメゾン" };

			string middle;
			string trail;
			string apartment;

			switch (SCommon.CRandom.GetInt(2))
			{
				case 0: middle =
					SCommon.CRandom.ChooseOne(CITY_TOWN_NAMES) + "市" +
					SCommon.CRandom.ChooseOne(CITY_TOWN_NAMES) + "区" +
					SCommon.CRandom.ChooseOne(CITY_TOWN_NAMES) + SCommon.CRandom.ChooseOne(new string[] { "町", "村" });
					break;

				case 1: middle =
					SCommon.CRandom.ChooseOne(CITY_TOWN_NAMES) + SCommon.CRandom.ChooseOne(new string[] { "市", "区" }) +
					SCommon.CRandom.ChooseOne(CITY_TOWN_NAMES) + SCommon.CRandom.ChooseOne(new string[] { "町", "村" });
					break;

				default:
					throw null;
			}

			switch (SCommon.CRandom.GetInt(2))
			{
				case 0: trail =
					SCommon.CRandom.GetRange(1, 9) + "丁目" +
					SCommon.CRandom.GetRange(1, 29) + "番地" +
					SCommon.CRandom.GetRange(1, 49) + "号";
					break;

				case 1: trail =
					SCommon.CRandom.GetRange(1000, 9999) + "番";
					break;

				default:
					throw null;
			}

			switch (SCommon.CRandom.GetInt(3))
			{
				case 0: apartment =
					"";
					break;

				case 1: apartment = " " +
					SCommon.CRandom.ChooseOne(HI_APARTMENT_NAMES) + " " +
					SCommon.CRandom.GetRange(1000, 9999) + "号室";
					break;

				case 2: apartment = " " +
					SCommon.CRandom.ChooseOne(HI_APARTMENT_NAMES) + " " +
					SCommon.CRandom.GetRange(1, 3) + "0" +
					SCommon.CRandom.GetRange(1, 9) + "号室";
					break;

				default:
					throw null;
			}

			string address =
				SCommon.CRandom.ChooseOne(PREFECTURES) +
				middle +
				trail +
				apartment;

			address = Common.HalfToFull(address);

			return address;
		}

		private const string SAVE_DATA_FILE = @"C:\temp\Customers.csv";

		private void SaveDb(string file = SAVE_DATA_FILE)
		{
			using (CsvFileWriter writer = new CsvFileWriter(file))
			{
				foreach (CustomerInfo customer in this.Customers)
				{
					writer.WriteCell(customer.CustomerId.ToString());
					writer.WriteCell(customer.FirstName);
					writer.WriteCell(customer.LastName);
					writer.WriteCell(customer.Email);
					writer.WriteCell(customer.PhoneNumber);
					writer.WriteCell(customer.Address);
					writer.WriteCell(customer.PostalCode);
					writer.WriteCell(customer.Value01.ToString());
					writer.WriteCell(customer.Value02.ToString());
					writer.WriteCell(customer.Value03.ToString());
					writer.WriteCell(customer.Value04.ToString());
					writer.WriteCell(customer.Value05.ToString());
					writer.WriteCell(customer.Value06.ToString());
					writer.WriteCell(customer.Value07.ToString());
					writer.WriteCell(customer.Value08.ToString());
					writer.WriteCell(customer.Value09.ToString());
					writer.WriteCell(customer.Value10.ToString());
					writer.EndRow();
				}
			}
		}

		private void LoadDb(string file = SAVE_DATA_FILE)
		{
			this.Customers.Clear();

			using (CsvFileReader reader = new CsvFileReader(file))
			{
				for (; ; )
				{
					string[] row = reader.ReadRow();

					if (row == null)
						break;

					CustomerInfo customer = new CustomerInfo();
					int c = 0;

					customer.CustomerId = int.Parse(row[c++]);
					customer.FirstName = row[c++];
					customer.LastName = row[c++];
					customer.Email = row[c++];
					customer.PhoneNumber = row[c++];
					customer.Address = row[c++];
					customer.PostalCode = row[c++];
					customer.Value01 = long.Parse(row[c++]);
					customer.Value02 = long.Parse(row[c++]);
					customer.Value03 = long.Parse(row[c++]);
					customer.Value04 = long.Parse(row[c++]);
					customer.Value05 = long.Parse(row[c++]);
					customer.Value06 = long.Parse(row[c++]);
					customer.Value07 = long.Parse(row[c++]);
					customer.Value08 = long.Parse(row[c++]);
					customer.Value09 = long.Parse(row[c++]);
					customer.Value10 = long.Parse(row[c++]);

					if (row.Length != c)
						throw null;

					this.Customers.Add(customer);
				}
			}
		}

		public void Test01()
		{
			CreateCustomers();

			this.SaveDb();
			this.LoadDb();

			this.SaveDb(@"C:\temp\1.csv");

			string hash1 = SCommon.Hex.ToString(SCommon.GetSHA512File(SAVE_DATA_FILE));
			string hash2 = SCommon.Hex.ToString(SCommon.GetSHA512File(@"C:\temp\1.csv"));

			if (hash1 != hash2)
				throw null;

			Console.WriteLine("OK");
		}

		public void Test02()
		{
			ProcMain.WriteLog("*1");

			this.LoadDb();

			ProcMain.WriteLog("*2");

			{
				List<CustomerInfo> dest = new List<CustomerInfo>();

				foreach (CustomerInfo customer in this.Customers)
				{
					if (customer.Address.Contains("東京都"))
					{
						dest.Add(customer);
					}
				}

				Console.WriteLine(dest.Count);
			}

			ProcMain.WriteLog("*3");
		}

		public void Test03()
		{
			ProcMain.WriteLog("*1");

			this.LoadDb();

			ProcMain.WriteLog("*2");

			{
				List<CustomerInfo> dest = new List<CustomerInfo>();

				foreach (CustomerInfo customer in this.Customers)
				{
					if (
						customer.Value01 % 13 == 0 ||
						customer.Value02 % 13 == 0 ||
						customer.Value03 % 13 == 0 ||
						customer.Value04 % 13 == 0 ||
						customer.Value05 % 13 == 0 ||
						customer.Value06 % 13 == 0 ||
						customer.Value07 % 13 == 0 ||
						customer.Value08 % 13 == 0 ||
						customer.Value09 % 13 == 0 ||
						customer.Value10 % 13 == 0
						)
					{
						dest.Add(customer);
					}
				}

				Console.WriteLine(dest.Count);
			}

			ProcMain.WriteLog("*3");
		}

		// ====
		// ====
		// ====

		private const string SQLITE_PROGRAM = @"C:\Berry\app\sqlite-tools-win32-x86-3410000\sqlite3.exe";

		private const string DB_DIR = @"C:\temp";
		private const string DB_LOCAL_NAME = "DB";
		private static string DB_FILE = Path.Combine(DB_DIR, DB_LOCAL_NAME);

		private string DoSql(string query)
		{
			using (WorkingDir wd = new WorkingDir())
			{
				string queryFile = wd.MakePath();
				string outputFile = wd.MakePath();

				File.WriteAllText(queryFile, query, Encoding.ASCII);

				SCommon.Batch(
					new string[]
					{
						SQLITE_PROGRAM + " " + DB_LOCAL_NAME + " < " + queryFile + " > " + outputFile,
					},
					DB_DIR
					);

				return File.ReadAllText(outputFile, Encoding.ASCII);
			}
		}

		public void Test04()
		{
			SCommon.DeletePath(DB_FILE);

			DoSql(@"
CREATE TABLE Customer(
	CustomerId,
	FirstName,
	LastName,
	Email,
	PhoneNumber,
	Address,
	PostalCode,
	Value01,
	Value02,
	Value03,
	Value04,
	Value05,
	Value06,
	Value07,
	Value08,
	Value09,
	Value10
	)
				");

			LoadDb();

#if false // 1行ずつ
			foreach (CustomerInfo customer in this.Customers)
			{
				DoSql(string.Format(@"
INSERT INTO Customer (
	CustomerId,
	FirstName,
	LastName,
	Email,
	PhoneNumber,
	Address,
	PostalCode,
	Value01,
	Value02,
	Value03,
	Value04,
	Value05,
	Value06,
	Value07,
	Value08,
	Value09,
	Value10
	)
	VALUES (
	{0},
	'{1}',
	'{2}',
	'{3}',
	'{4}',
	'{5}',
	'{6}',
	{7},
	{8},
	{9},
	{10},
	{11},
	{12},
	{13},
	{14},
	{15},
	{16}
	)
					"
					, customer.CustomerId
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.FirstName))
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.LastName))
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.Email))
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.PhoneNumber))
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.Address))
					, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.PostalCode))
					, customer.Value01
					, customer.Value02
					, customer.Value03
					, customer.Value04
					, customer.Value05
					, customer.Value06
					, customer.Value07
					, customer.Value08
					, customer.Value09
					, customer.Value10
					));
			}
#else // 複数行同時
			for (int index = 0; index < this.Customers.Count; )
			{
				int count = Math.Min(this.Customers.Count - index, 30000);
				string query;

				{
					StringBuilder buff = new StringBuilder();

					buff.Append(@"
INSERT INTO Customer (
	CustomerId,
	FirstName,
	LastName,
	Email,
	PhoneNumber,
	Address,
	PostalCode,
	Value01,
	Value02,
	Value03,
	Value04,
	Value05,
	Value06,
	Value07,
	Value08,
	Value09,
	Value10
	)
	VALUES (
						");

					for (int i = 0; i < count; i++)
					{
						if (1 <= i)
							buff.Append("), (");

						CustomerInfo customer = this.Customers[index + i];

						buff.Append(string.Format(@"
	{0},
	'{1}',
	'{2}',
	'{3}',
	'{4}',
	'{5}',
	'{6}',
	{7},
	{8},
	{9},
	{10},
	{11},
	{12},
	{13},
	{14},
	{15},
	{16}
							"
							, customer.CustomerId
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.FirstName))
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.LastName))
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.Email))
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.PhoneNumber))
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.Address))
							, BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes(customer.PostalCode))
							, customer.Value01
							, customer.Value02
							, customer.Value03
							, customer.Value04
							, customer.Value05
							, customer.Value06
							, customer.Value07
							, customer.Value08
							, customer.Value09
							, customer.Value10
							));
					}
					buff.Append(")");

					query = buff.ToString();
				}

				DoSql(query);

				// ----

				index += count;
			}
#endif
		}

		public void Test05()
		{
			ProcMain.WriteLog("*1");

			string outputText = DoSql("SELECT COUNT(*) FROM Customer WHERE Address LIKE '%" + BitConverter.ToString(SCommon.ENCODING_SJIS.GetBytes("東京都")) + "%'");
			Console.WriteLine(outputText);

			ProcMain.WriteLog("*2");
		}

		public void Test06()
		{
			ProcMain.WriteLog("*1");

			string outputText = DoSql(@"
SELECT
	COUNT(*)
FROM
	Customer
WHERE
	Value01 % 13 = 0 OR
	Value02 % 13 = 0 OR
	Value03 % 13 = 0 OR
	Value04 % 13 = 0 OR
	Value05 % 13 = 0 OR
	Value06 % 13 = 0 OR
	Value07 % 13 = 0 OR
	Value08 % 13 = 0 OR
	Value09 % 13 = 0 OR
	Value10 % 13 = 0
				");
			Console.WriteLine(outputText);

			ProcMain.WriteLog("*2");
		}
	}
}
