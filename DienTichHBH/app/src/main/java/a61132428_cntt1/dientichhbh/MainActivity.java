package a61132428_cntt1.dientichhbh;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    EditText chieucao,canhday,canhben;
    Button tinhChuvi,tinhDientich;
    TextView ketqua;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        chieucao=(EditText)findViewById(R.id.edtCao);
        canhday=(EditText)findViewById(R.id.edtDay);
        canhben=(EditText)findViewById(R.id.edtBen);
        tinhDientich=(Button)findViewById(R.id.btnCV);
        tinhDientich=(Button)findViewById(R.id.btnDT);
        ketqua=(TextView)findViewById(R.id.txtkq);

        tinhChuvi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int cday =Integer.parseInt(canhday.getText().toString());
                int cben =Integer.parseInt(canhben.getText().toString());
                int kqua=(cday+cben)*2;
                ketqua.setText("Chu vi hinh binh hanh la : "+kqua);

            }
        });
        tinhDientich.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int cday =Integer.parseInt(canhday.getText().toString());
                int ccao =Integer.parseInt(chieucao.getText().toString());
                int kqua=cday*ccao;
                ketqua.setText("Dien tich hinh binh hanh la : "+kqua);
            }
        });

    }
}