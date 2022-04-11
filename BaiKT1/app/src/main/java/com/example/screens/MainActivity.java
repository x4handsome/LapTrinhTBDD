package com.example.screens;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.view.MenuItem;
import android.view.Menu;

public class MainActivity extends Activity {
    EditText edtUserName, edtPassWord;
    Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        edtUserName = (EditText) findViewById(R.id.editTextUserName);
        edtPassWord = (EditText) findViewById(R.id.eidtTextPassWord);
        btnLogin = (Button) findViewById(R.id.buttonLogin);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = "maicuongtho";
                String pass = "cntt60ntu";
                if (edtUserName.getText().toString().equals(username) && edtPassWord.getText().toString().equals(pass)) {
                    Toast.makeText(getApplicationContext(), "User and Password is correct", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(getApplicationContext(), "User and Password is wrong", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}