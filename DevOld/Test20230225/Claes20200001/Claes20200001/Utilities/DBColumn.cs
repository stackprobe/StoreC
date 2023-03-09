using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Utilities
{
	public class DBColumn
	{
		public enum ColumnType_e
		{
			LONG = 1,
			STRING
		}

		public ColumnType_e ColumnType;
		public string Name;

		public DBColumn(ColumnType_e columnType, string name)
		{
			this.ColumnType = columnType;
			this.Name = name;
		}

		public string ToDBValue(string value)
		{
			switch (this.ColumnType)
			{
				case ColumnType_e.LONG:
					value = ToDBValueLong(long.Parse(value));
					break;

				case ColumnType_e.STRING:
					value = ToDBValueString(value);
					break;

				default:
					throw null; // never
			}
			return value;
		}

		public string FromDBValue(string value)
		{
			switch (this.ColumnType)
			{
				case ColumnType_e.LONG:
					value = FromDBValueLong(value).ToString();
					break;

				case ColumnType_e.STRING:
					value = FromDBValueString(value);
					break;

				default:
					throw null; // never
			}
			return value;
		}

		// ----

		public static string ToDBValueLong(long value)
		{
			return value.ToString();
		}

		public static string ToDBValueString(string value)
		{
			return "'" + BitConverter.ToString(Encoding.UTF8.GetBytes(value)) + "'";
		}

		public static long FromDBValueLong(string value)
		{
			return long.Parse(value);
		}

		public static string FromDBValueString(string value)
		{
			return Encoding.UTF8.GetString(SCommon.Hex.ToBytes(value.Replace("-", "")));
		}
	}
}
