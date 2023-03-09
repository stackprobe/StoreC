using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0005
	{
		public void Test01()
		{
			Database db = new Database(@"C:\temp\DB");
			DBTable table = new DBTable(db, "Table_01", new DBColumn[]
			{
				new DBColumn(DBColumn.ColumnType_e.LONG, "ID"),
				new DBColumn(DBColumn.ColumnType_e.STRING, "NAME"),
				new DBColumn(DBColumn.ColumnType_e.STRING, "VALUE"),
				new DBColumn(DBColumn.ColumnType_e.LONG, "UPDT_DATE"),
			});

			table.Drop();
			table.Create();

			table.Insert(new string[][]
			{
				new string[] {"1", "いろは歌", "いろはにほへと", "20230227" },
				new string[] {"2", "ほげほげ", "なんじゃそりゃ", "20230228" },
				new string[] {"3", "ああああ", "んんんんんんん", "20230301" },
				new string[] {"4", "げろげろ", "谷⇒⇒⇒⇒⇒啓", "20230302" },
			});

			table.Select("1 = 1", row =>
			{
				Console.WriteLine(string.Join(", ", row));
			});
		}
	}
}
