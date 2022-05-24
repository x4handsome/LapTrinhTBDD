package a61132428.bai2_qlbaitho;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Tho tho= new Tho(MainActivity.this);
        for(int i=0;i<20;i++){
            BaiTho bt= new BaiTho("Que Huong"+System.currentTimeMillis(),"tho");
            tho.add(bt);
        }
    }
}