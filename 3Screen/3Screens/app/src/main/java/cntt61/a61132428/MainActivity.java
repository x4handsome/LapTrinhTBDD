package cntt61.a61132428;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
    public void ChuyenManHinh(View v){
        Intent IManHinhKhac = new Intent( this, SubActivity.class);
        startActivity(IManHinhKhac);
    }
}