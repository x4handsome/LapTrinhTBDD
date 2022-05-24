package a61132428.bai2_qlbaitho;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import androidx.annotation.Nullable;

public class Tho extends SQLiteOpenHelper {
    public Tho(@Nullable Context context){
        super(context,"data.db",null,1);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        String create_QueHuong="create table BaiTho(Tentho nvarchar(50) primary key, Name text(100))";
        db.execSQL(create_QueHuong);

    }
    public void add(BaiTho bt){
        SQLiteDatabase database= getReadableDatabase();
        ContentValues contentValues= new ContentValues();
        contentValues.put("Tentho",bt.getId());
        contentValues.put("Name",bt.getName());
        database.insert("BaiTho",null,contentValues);
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
