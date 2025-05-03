<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login-Kawal PTN</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome (untuk ikon) -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <link href="{{asset('/FrontEnd/css/style.css')}}" rel="stylesheet">
</head>

<body class="bg-light">
    <div class="container py-5">
        <!-- Pills navs -->
        <div class="d-flex justify-content-center gap-2 mb-3">
            <a href="/login" class="btn btn-outline-primary btn-floating">
                <i class="fas fa-sign-in-alt me-1"></i> Login
            </a>
            <a href="/register" class="btn btn-outline-success btn-floating">
                <i class="fas fa-user-plus me-1"></i> Register
            </a>
        </div>

        <!-- Pills navs -->

        <!-- Pills content -->
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow rounded-4">
                    <div class="card-body">
                        <form>
                            <a class=""><img class="auth-logo" src="{{asset('/FrontEnd/img/steganography.bmp')}}"></a>
                            <br>
                            <div class="text-center mb-3">
                                <p>Sign in with:</p>
                                <button type="button" class="btn btn-outline-primary btn-floating mx-1">
                                    <i class="fab fa-facebook-f"></i>
                                </button>
                                <button type="button" class="btn btn-outline-danger btn-floating mx-1">
                                    <i class="fab fa-google"></i>
                                </button>
                                <button type="button" class="btn btn-outline-info btn-floating mx-1">
                                    <i class="fab fa-twitter"></i>
                                </button>
                                <button type="button" class="btn btn-outline-dark btn-floating mx-1">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>

                            <p class="text-center">or:</p>

                            <div class="mb-3">
                                <label for="loginName" class="form-label">Email or Username</label>
                                <input type="email" class="form-control" id="loginName">
                            </div>

                            <div class="mb-3">
                                <label for="loginPassword" class="form-label">Password</label>
                                <input type="pasword" class="form-control" id="loginPassword">
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="loginCheck" checked>
                                        <label class="form-check-label" for="loginCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6 text-md-end">
                                    <a href="#">Forgot password?</a>
                                </div>
                            </div>

                            <a type="submit" class="btn btn-outline-primary btn-floating w-100 mb-3" href="/">Sign in</a>

                            <div class="text-center">
                                <p>Not a member? <a href="/register">Register</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</body>

</html>