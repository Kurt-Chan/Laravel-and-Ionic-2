<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required',
            'lastName' => 'required',
            'gender' => 'required',
            'email' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $password = md5($request->password);

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'gender' => $request->gender,
            'email' => $request->email,
            'username' => $request->username,
            'password' => $password,
        ]);

        return response()->json([
            'success' => 'user created!',
            'user' => $user
        ]);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $password = md5($request->password);

        $user = User::where('username', $request->username)
            ->where('password', $password)
            ->first();

        if (!$user) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        $token = $user->createToken('token');

        return $this->respondWithToken($token->plainTextToken);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out success'], 200);
        } else {
            return response()->json(['message' => 'User is unauthenticated'], 401);
        }
    }

    public function me(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User is unauthenticated'], 401);
        }
        return $request->user();
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => config('sanctum.expiration'),
        ]);
    }
}
