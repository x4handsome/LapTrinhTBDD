package com.example.chuyendoinhietdo;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    Button btnC, btnF, bntClear;
    EditText edtF, edtC;
    TextView txtF, txtC;
    OnClickListener myclick = new OnClickListener() {
        @Override

        public void onClick(View view) {

            switch(view.getId())

            {

                case R.id.btnC:

                    String sC=edtC.getText()+"";
                    int F=Integer.parseInt(sC);
                    F=F*9/5-32;
                    txtF.setText(F);
                    break;
                case R.id.btnF:

                    String sF=edtC.getText()+"";
                    int C=Integer.parseInt(sF);
                    C=(C-32)*(5/9);
                    txtC.setText(C);
                    break;
            }
        }
    };

    @Override

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        btnC=(Button) findViewById(R.id.btnC);

        btnF=(Button) findViewById(R.id.btnF);

        edtC=(EditText) findViewById(R.id.edtC);

        edtF=(EditText) findViewById(R.id.edtF);

        btnF.setOnClickListener(myclick);

        btnC.setOnClickListener(myclick);

    }

}
