using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Diagnostics;
using Charlotte.Commons;

namespace Charlotte.Utilities
{
	public class DBTable
	{
		private Database DB;
		private string TableName;
		private DBColumn[] Columns;

		public DBTable(Database db, string name, DBColumn[] columns)
		{
			this.DB = db;
			this.TableName = name;
			this.Columns = columns;
		}

		private void ResultFileToLog(string resultFile)
		{
#if false
			string dbLogFile = Path.Combine(Environment.GetEnvironmentVariable("TMP"), "{4bb0d22c-61c2-4861-bc4c-feec32cd35b1}_DB_" + Process.GetCurrentProcess().Id + ".log");

			using (FileStream reader = new FileStream(resultFile, FileMode.Open, FileAccess.Read))
			using (FileStream writer = new FileStream(dbLogFile, FileMode.Append, FileAccess.Write))
			{
				SCommon.ReadToEnd(reader.Read, writer.Write);
			}
#endif
		}

		public void Create()
		{
			StringBuilder query = new StringBuilder();

			query.Append("CREATE TABLE ");
			query.Append(this.TableName);
			query.Append(" ( ");
			query.Append(string.Join(" , ", this.Columns.Select(v => v.Name)));
			query.Append(" );");

			this.DB.Execute(query.ToString(), this.ResultFileToLog);
		}

		public void Drop()
		{
			StringBuilder query = new StringBuilder();

			query.Append("DROP TABLE ");
			query.Append(this.TableName);
			query.Append(" ;");

			this.DB.Execute(query.ToString(), this.ResultFileToLog);
		}

		public void Delete(string condition)
		{
			StringBuilder query = new StringBuilder();

			query.Append("DELETE FROM ");
			query.Append(this.TableName);
			query.Append(" WHERE ");
			query.Append(condition);

			this.DB.Execute(query.ToString(), this.ResultFileToLog);
		}

		public void Insert(IEnumerable<string[]> rows)
		{
			StringBuilder query = null;

			using (IEnumerator<string[]> reader = rows.GetEnumerator())
			{
				while (reader.MoveNext())
				{
					if (query == null)
					{
						query = new StringBuilder();
						query.Append("INSERT INTO ");
						query.Append(this.TableName);
						query.Append(" ( ");
						query.Append(string.Join(" , ", this.Columns.Select(v => v.Name)));
						query.Append(" ) VALUES ");
					}
					else
					{
						query.Append(" , ");
					}
					string[] row = reader.Current;

					row = Enumerable.Range(0, row.Length)
						.Select(index => this.Columns[index].ToDBValue(row[index]))
						.ToArray();

					query.Append("( ");
					query.Append(string.Join(" , ", row));
					query.Append(" )");

					if (30000000 < query.Length) // rought limit
					{
						this.DB.Execute(query.ToString(), this.ResultFileToLog);
						query = null;
					}
				}
				if (query != null)
				{
					this.DB.Execute(query.ToString(), this.ResultFileToLog);
				}
			}
		}

		public void Select(string condition, Action<string[]> reaction)
		{
			StringBuilder query = new StringBuilder();

			query.Append("SELECT ");
			query.Append(string.Join(" , ", this.Columns.Select(v => v.Name)));
			query.Append(" FROM ");
			query.Append(this.TableName);
			query.Append(" WHERE ");
			query.Append(condition);

			this.DB.Execute(query.ToString(), resultFile =>
			{
				using (StreamReader reader = new StreamReader(resultFile, Encoding.ASCII))
				{
					for (; ; )
					{
						string line = reader.ReadLine();

						if (line == null)
							break;

						string[] row = line.Split('|');

						row = Enumerable.Range(0, row.Length)
							.Select(index => this.Columns[index].FromDBValue(row[index]))
							.ToArray();

						reaction(row);
					}
				}
			});
		}
	}
}
