package cntt61.a61132428;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

public class SubActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sub);
    }
    public void Quayve(View v){
        Intent IManHinhChinh= new Intent(this, MainActivity.class);
        startActivity(IManHinhChinh);
    }
}